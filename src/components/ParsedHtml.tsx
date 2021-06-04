import React, { Fragment } from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { LenkeInline } from './_common/lenke/LenkeInline';
import { getMediaUrl } from '../utils/urls';
import {
    getProcessedHtmlPropsWithBackwardsCompatibility,
    processedHtmlMacroTag,
    ProcessedHtmlProps,
} from '../types/processed-html-props';
import { MacroMapper } from './macros/MacroMapper';
import { Button } from './_common/button/Button';
import { LenkeStandalone } from './_common/lenke/LenkeStandalone';
import { headingToTypoStyle, typoToComponent } from '../types/typo-style';
import './macros/Quote.less';
import './macros/Video.less';

const parsedHtmlLegacy = (content: string) => {
    if (!content) {
        return null;
    }

    const replaceElements = {
        replace: ({ name, attribs, children }: DomElement) => {
            const tag = name?.toLowerCase();
            const className = attribs?.class || '';

            if (className.includes('macroChatbotLink')) {
                return (
                    <LenkeInline
                        href={'/'}
                        onClick={(e) => {
                            e.preventDefault();
                            const chatButton = document.getElementById(
                                'chatbot-frida-knapp'
                            );
                            chatButton?.click?.();
                        }}
                    >
                        {domToReact(children)}
                    </LenkeInline>
                );
            }

            if (tag === 'img' && attribs?.src) {
                return (
                    <img
                        {...attributesToProps(attribs)}
                        alt={attribs.alt || ''}
                        src={getMediaUrl(attribs.src)}
                    />
                );
            }

            if (tag === 'h1' && children) {
                return (
                    <Innholdstittel>
                        {domToReact(children, replaceElements)}
                    </Innholdstittel>
                );
            }

            if (tag === 'p' && children) {
                return (
                    <Normaltekst>
                        {domToReact(children, replaceElements)}
                    </Normaltekst>
                );
            }

            if (tag === 'a' && attribs?.href && children) {
                const href = attribs.href.replace('https://www.nav.no', '');

                if (
                    className.includes('macroButton') ||
                    className.includes('btn-link')
                ) {
                    return (
                        <Button
                            href={href}
                            type={
                                className.includes('macroButtonBlue') ||
                                className.includes('btn-primary')
                                    ? 'hoved'
                                    : 'standard'
                            }
                        >
                            {domToReact(children)}
                        </Button>
                    );
                }

                const props = attributesToProps(attribs);

                if (className.includes('chevron')) {
                    return (
                        <LenkeStandalone
                            {...props}
                            href={href}
                            withChevron={true}
                        >
                            {domToReact(children)}
                        </LenkeStandalone>
                    );
                }

                return (
                    <LenkeInline {...props} href={href}>
                        {domToReact(children)}
                    </LenkeInline>
                );
            }
        },
    };

    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        content
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .replace(/(<table)/gm, '<table class="tabell tabell--stripet"'),
        replaceElements
    );

    return <>{htmlParsed}</>;
};

const blockLevelMacros = {
    'html-fragment': true,
    infoBoks: true,
    varselBoks: true,
    video: true,
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
    htmlProps: ProcessedHtmlProps;
};

export const ParsedHtml = (props: Props) => {
    const htmlProps = getProcessedHtmlPropsWithBackwardsCompatibility(
        props.htmlProps
    );

    if (htmlProps.isLegacy) {
        return parsedHtmlLegacy(htmlProps.processedHtml);
    }

    const { processedHtml, macros } = htmlProps;

    if (!processedHtml) {
        return null;
    }

    const replaceElements = {
        replace: (element: DomElement) => {
            const { name, attribs, children } = element;
            const tag = name?.toLowerCase();
            const props = !!attribs && attributesToProps(attribs);

            // Block level elements should not be nested under inline elements
            if (hasBlockLevelMacroChildren(element)) {
                return <>{domToReact(children, replaceElements)}</>;
            }

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

                const typoStyle = headingToTypoStyle[tag];
                const TypoComponent = typoToComponent[typoStyle];

                return (
                    // H1 tags should only be used for the page title
                    <TypoComponent {...props} tag={tag === 'h1' ? 'h2' : tag}>
                        {domToReact(validChildren, replaceElements)}
                    </TypoComponent>
                );
            }

            if (tag === 'p' && children) {
                return (
                    <Normaltekst {...props}>
                        {domToReact(children, replaceElements)}
                    </Normaltekst>
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
