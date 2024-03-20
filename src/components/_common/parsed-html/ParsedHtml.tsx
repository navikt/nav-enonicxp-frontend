import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import ReactDOMServer from 'react-dom/server';
import { isTag, isText } from 'domhandler';
import { usePageContextProps } from 'store/pageContext';
import { NextImage } from '../image/NextImage';
import htmlReactParser, {
    Element,
    domToReact,
    attributesToProps,
    DOMNode,
} from 'html-react-parser';
import { getMediaUrl } from 'utils/urls';
import {
    processedHtmlMacroTag,
    ProcessedHtmlProps,
} from 'types/processed-html-props';
import { headingToLevel, headingToSize } from 'types/typo-style';
import { MacroType } from 'types/macro-props/_macros-common';
import { MacroMapper } from '../../macros/MacroMapper';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LenkeInline } from '../lenke/LenkeInline';
import { Table } from '../table/Table';
import { BodyLong, Heading } from '@navikt/ds-react';

const blockLevelMacros: ReadonlySet<string> = new Set([
    MacroType.AlertBox,
    MacroType.HeaderWithAnchor,
    MacroType.HtmlFragment,
    MacroType.InfoBoks,
    MacroType.Ingress,
    MacroType.ProductCardMini,
    MacroType.ProductCardMicro,
    MacroType.Quote,
    MacroType.VarselBoks,
    MacroType.Video,
    MacroType.FormDetails,
]);

const hasBlockLevelMacroChildren = (element: Element) => {
    return element.children?.some(
        (child) =>
            isTag(child) &&
            child.name === processedHtmlMacroTag &&
            blockLevelMacros.has(child.attribs?.['data-macro-name'])
    );
};

const getNonEmptyChildren = ({ children }: Element) => {
    const validChildren = children?.filter((child) => {
        if (isTag(child)) {
            // Macros and image tags are allowed to be empty
            if (
                child.name === processedHtmlMacroTag ||
                (child.name === 'img' && child.attribs?.src)
            ) {
                return true;
            }

            const grandChildren = getNonEmptyChildren(child);
            return !!grandChildren;
        }

        if (isText(child)) {
            const stringData = child.data?.replace?.(/&nbsp;/g, ' ').trim();
            return !!stringData;
        }

        return true;
    });
    return validChildren?.length > 0 && validChildren;
};

type Props = {
    htmlProps: ProcessedHtmlProps | string;
};

export const ParsedHtml = ({ htmlProps }: Props) => {
    const { editorView } = usePageContextProps();

    if (!htmlProps) {
        return null;
    }

    const { processedHtml, macros } =
        typeof htmlProps === 'string'
            ? { processedHtml: htmlProps, macros: [] }
            : htmlProps;

    if (!processedHtml) {
        return null;
    }

    const parserOptions = {
        replace: (element: Element) => {
            const { name } = element;
            const tag = name?.toLowerCase();
            //Remove all inline styling except in table cells
            if (tag !== 'td') {
                delete element?.attribs?.style;
            }
            const { attribs, children } = element;
            const domNodes = children as DOMNode[];
            const props = !!attribs && attributesToProps(attribs);
            const validChildren = getNonEmptyChildren(element);

            // Handle macros
            if (tag === processedHtmlMacroTag) {
                return (
                    <MacroMapper
                        macros={macros}
                        macroRef={attribs?.['data-macro-ref']}
                    />
                );
            }

            // Remove img without src
            if (tag === 'img') {
                if (!attribs?.src) {
                    return <Fragment />;
                }
                return (
                    <NextImage
                        {...props}
                        alt={attribs.alt || ''}
                        src={getMediaUrl(attribs.src, !!editorView)}
                    />
                );
            }

            // Fix header-tags
            if (tag?.match(/^h[1-6]$/)) {
                // Header-tags should not be used as empty spacers
                if (!validChildren) {
                    return <p>{''}</p>;
                }

                const level = headingToLevel[tag] || 2; //Level 1 reserved for page heading
                const size = headingToSize[tag];

                // Ignore heading-tag if it contains a macro
                if (hasBlockLevelMacroChildren(element)) {
                    return <>{domToReact(domNodes, parserOptions)}</>;
                }

                return (
                    // H1 tags should only be used for the page heading
                    <Heading {...props} size={size} level={level} spacing>
                        {domToReact(validChildren, parserOptions)}
                    </Heading>
                );
            }

            // Handle paragraphs
            if (tag === 'p' && children) {
                // Block level elements should not be nested under inline elements
                if (hasBlockLevelMacroChildren(element)) {
                    return <>{domToReact(domNodes, parserOptions)}</>;
                }
                return (
                    <BodyLong spacing {...props} className={undefined}>
                        {domToReact(domNodes, parserOptions)}
                    </BodyLong>
                );
            }

            // Remove underline
            if (tag === 'u') {
                if (!children) {
                    return <Fragment />;
                }

                return <>{domToReact(domNodes, parserOptions)}</>;
            }

            // Handle links
            if (tag === 'a') {
                if (!validChildren || typeof props.href !== 'string') {
                    return <Fragment />;
                }

                return (
                    <LenkeInline
                        {...props}
                        href={props.href}
                        style={undefined}
                        className={undefined}
                    >
                        {domToReact(validChildren, parserOptions)}
                    </LenkeInline>
                );
            }

            // Remove empty lists and other tags that should not be empty
            switch (tag) {
                case 'ul':
                case 'ol':
                case 'dl':
                case 'div':
                case 'thead':
                    if (!validChildren) {
                        return <Fragment />;
                    }
                    break;
            }

            // Handle li - remove if empty
            if (tag === 'li') {
                if (!validChildren) {
                    return <Fragment />;
                }
                return (
                    <BodyLong {...props} as={'li'}>
                        {domToReact(validChildren, parserOptions)}
                    </BodyLong>
                );
            }

            // Table class fix, excluding large-table (statistics pages)
            if (tag === 'table' && attribs?.class !== 'statTab') {
                return (
                    <Table>{domToReact(validChildren, parserOptions)}</Table>
                );
            }

            // Replace empty rows with stylable element
            if (tag === 'tr' && !validChildren) {
                return <tr {...props} role="none" className={'spacer-row'} />;
            }
        },
    };

    const htmlParsed = htmlReactParser(processedHtml, parserOptions);

    // If the html renders to an empty string (or whitespace only), show an
    // error message in the editor
    if (editorView === 'edit') {
        const htmlRaw = ReactDOMServer.renderToStaticMarkup(
            <Provider store={store}>{htmlParsed}</Provider>
        ).trim();

        if (!htmlRaw) {
            return (
                <EditorHelp
                    text={"HTML'en er tom eller inneholder feil."}
                    globalWarningText={'Feil på riktekst/HTML-komponent'}
                    type={'error'}
                />
            );
        }
    }

    return <>{htmlParsed}</>;
};
