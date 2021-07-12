import React, { Fragment } from 'react';
import { BodyLong, Title } from '@navikt/ds-react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
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

const hasBlockLevelMacroChildren = (element: DomElement) => {
    return element.children?.some(
        (child) =>
            child.name === processedHtmlMacroTag &&
            blockLevelMacros[child.attribs?.['data-macro-name']]
    );
};

const getNonEmptyChildren = ({ children }: DomElement) => {
    const validChildren = children?.filter((child) => {
        const { data, name } = child;

        if (name === processedHtmlMacroTag) {
            return true;
        }

        const grandChildren = getNonEmptyChildren(child);

        if (!data && !grandChildren) {
            return false;
        }

        if (typeof data !== 'string') {
            return true;
        }

        const stringData = data.replace(/&nbsp;/g, ' ').trim();
        return !!stringData;
    });
    return validChildren?.length > 0 && validChildren;
};

type Props = {
    htmlProps: ProcessedHtmlProps | string;
};

export const ParsedHtml = ({ htmlProps }: Props) => {
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
        replace: (element: DomElement) => {
            const { name, attribs, children } = element;
            const tag = name?.toLowerCase();
            const props = !!attribs && attributesToProps(attribs);

            if (tag === processedHtmlMacroTag) {
                return (
                    <MacroMapper
                        macros={macros}
                        macroRef={attribs?.['data-macro-ref']}
                    />
                );
            }

            if (tag === 'img') {
                return attribs?.src ? (
                    <img
                        {...props}
                        alt={attribs.alt || ''}
                        src={getMediaUrl(attribs.src)}
                    />
                ) : (
                    <Fragment />
                );
            }

            if (tag?.match(/^h[1-6]$/)) {
                const validChildren = getNonEmptyChildren(element);

                // Header-tags should not be used as empty spacers
                if (!validChildren) {
                    return <p>{'&nbsp;'}</p>;
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

            if (tag === 'a') {
                const href = attribs?.href?.replace('https://www.nav.no', '');
                const validChildren = getNonEmptyChildren(element);

                return validChildren ? (
                    <LenkeInline {...props} href={href}>
                        {domToReact(validChildren, replaceElements)}
                    </LenkeInline>
                ) : (
                    <Fragment />
                );
            }

            // Remove empty lists
            if (tag === 'ul') {
                const validChildren = getNonEmptyChildren(element);
                if (!validChildren) {
                    return <Fragment />;
                }

                return (
                    <ul {...props}>
                        {domToReact(validChildren, replaceElements)}
                    </ul>
                );
            }

            if (tag === 'table') {
                return (
                    <table {...props} className={'tabell tabell--stripet'}>
                        {domToReact(children, replaceElements)}
                    </table>
                );
            }
        },
    };

    const htmlParsed = htmlReactParser(
        processedHtml
            // Remove whitespace/linebreaks to prevent certain parsing errors
            .replace(/(\r\n|\n|\r|\s)/gm, ' '),
        replaceElements
    );

    return <>{htmlParsed}</>;
};
