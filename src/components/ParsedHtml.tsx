import React, { Fragment } from 'react';
import { BodyLong, Title } from '@navikt/ds-react';
import htmlReactParser, { Element, domToReact } from 'html-react-parser';
import { isTag, isText } from 'domhandler';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { LenkeInline } from './_common/lenke/LenkeInline';
import { getMediaUrl } from '../utils/urls';
import {
    processedHtmlMacroTag,
    ProcessedHtmlProps,
} from '../types/processed-html-props';
import { MacroMapper } from './macros/MacroMapper';
import { headingToLevel, headingToSize } from '../types/typo-style';
import { MacroType } from '../types/macro-props/_macros-common';
import { BEM } from '../utils/classnames';
import classNames from 'classnames';
import { usePageConfig } from '../store/hooks/usePageConfig';
import { EditorHelp } from './_common/editor-utils/editor-help/EditorHelp';
import ReactDOMServer from 'react-dom/server';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import './ParsedHtml.less';

const blockLevelMacros = {
    [MacroType.HeaderWithAnchor]: true,
    [MacroType.HtmlFragment]: true,
    [MacroType.InfoBoks]: true,
    [MacroType.Ingress]: true,
    [MacroType.ProductCardMini]: true,
    [MacroType.Quote]: true,
    [MacroType.VarselBoks]: true,
    [MacroType.Video]: true,
};

const bem = BEM('tabell');

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
            if (child.name === processedHtmlMacroTag) {
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

    const replaceElements = {
        replace: (element: Element) => {
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
                if ( !attribs?.src ) {
                    return <Fragment />;
                }
                return (
                    <img
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
                    return <p>{' '}</p>;
                }

                const level = headingToLevel[tag] || 2; //Level 1 reserved for page title
                const size = headingToSize[tag];

                return (
                    // H1 tags should only be used for the page title
                    <Title {...props} size={size} level={level} spacing>
                        {domToReact(validChildren, replaceElements)}
                    </Title>
                );
            }

            // Handle paragraphs
            if (tag === 'p' && children) {
                // Block level elements should not be nested under inline elements
                if (hasBlockLevelMacroChildren(element)) {
                    return <>{domToReact(children, replaceElements)}</>;
                }
                return (
                    <BodyLong spacing {...props}>
                        {domToReact(children, replaceElements)}
                    </BodyLong>
                );
            }

            // Handle links
            if (tag === 'a') {
                const href = attribs?.href?.replace('https://www.nav.no', '');

                if (!validChildren) {
                    return <Fragment />;
                }
                return (
                    <LenkeInline {...props} href={href}>
                        {domToReact(validChildren, replaceElements)}
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
                        {domToReact(validChildren, replaceElements)}
                    </ul>
                );
            }

            // Table class fix, excluding large-table (statistics pages)
            if (tag === 'table' && attribs?.class !== 'statTab') {
                return (
                    <div className={classNames(bem('horisontal-scroll'))}>
                        <table {...props} className={'tabell tabell--stripet'}>
                            {domToReact(children, replaceElements)}
                        </table>
                    </div>
                );
            }

            // Replace empty rows with stylable element
            if (tag === 'tr' && !validChildren) {
                return (
                    <tr {...props} className={'spacer-row'} />
                );
            }

            // Remove empty divs
            if (tag === 'div' && !validChildren) {
                return <Fragment />;
            }
        },
    };

    const htmlParsed = htmlReactParser(
        processedHtml
            // Remove whitespace/linebreaks to prevent certain parsing errors
            .replace(/(\r\n|\n|\r|\s)/gm, ' '),
        replaceElements
    );

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
