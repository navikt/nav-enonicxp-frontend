import React, { Fragment } from 'react';
import { NextImage } from '../image/NextImage';
import { BodyLong, Heading } from '@navikt/ds-react';
import htmlReactParser, {
    Element,
    domToReact,
    attributesToProps,
} from 'html-react-parser';
import { isTag, isText } from 'domhandler';
import { LenkeInline } from '../lenke/LenkeInline';
import { getMediaUrl } from '../../../utils/urls';
import {
    processedHtmlMacroTag,
    ProcessedHtmlProps,
} from '../../../types/processed-html-props';
import { MacroMapper } from '../../macros/MacroMapper';
import { headingToLevel, headingToSize } from '../../../types/typo-style';
import { MacroType } from '../../../types/macro-props/_macros-common';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import ReactDOMServer from 'react-dom/server';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { Table } from '../table/Table';

const blockLevelMacros: { [macroType in MacroType]?: boolean } = {
    [MacroType.AlertBox]: true,
    [MacroType.HeaderWithAnchor]: true,
    [MacroType.HtmlFragment]: true,
    [MacroType.InfoBoks]: true,
    [MacroType.Ingress]: true,
    [MacroType.ProductCardMini]: true,
    [MacroType.Quote]: true,
    [MacroType.VarselBoks]: true,
    [MacroType.Video]: true,
};

const hasBlockLevelMacroChildren = (element: Element) => {
    return element.children?.some(
        (child) =>
            isTag(child) &&
            child.name === processedHtmlMacroTag &&
            blockLevelMacros[child.attribs?.['data-macro-name']]
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
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

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
            //Fjern all eventuell inline styling
            delete element?.attribs?.style;

            const { name, attribs, children } = element;
            const tag = name?.toLowerCase();
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
                        src={getMediaUrl(attribs.src)}
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
                    return <>{domToReact(children, parserOptions)}</>;
                }
                return (
                    <BodyLong spacing {...props} className={undefined}>
                        {domToReact(children, parserOptions)}
                    </BodyLong>
                );
            }

            if (tag === 'u') {
                if (!children) {
                    return <Fragment />;
                }

                return <>{domToReact(children, parserOptions)}</>;
            }

            // Handle links
            if (tag === 'a') {
                if (!validChildren) {
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

            // Remove empty lists
            if (tag === 'ul') {
                if (!validChildren) {
                    return <Fragment />;
                }
                return (
                    <ul {...props}>
                        {domToReact(validChildren, parserOptions)}
                    </ul>
                );
            }

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

            // Remove empty divs
            if (tag === 'div' && !validChildren) {
                return <Fragment />;
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
                    type={'error'}
                />
            );
        }
    }

    return <>{htmlParsed}</>;
};
