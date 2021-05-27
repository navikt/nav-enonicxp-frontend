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

// Filters out empty children of an element
const getValidChildren = ({ children }: DomElement) => {
    const validChildren = children?.filter((child) => {
        const { data } = child;
        const validGrandChildren = getValidChildren(child);

        if (!data && !validGrandChildren) {
            return false;
        }

        if (typeof data !== 'string') {
            return true;
        }

        const stringData = data.trim();
        return stringData && stringData !== '&nbsp;';
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
            const { name, attribs } = element;
            const children = getValidChildren(element);
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
                // Header-tags should not be used as empty spacers
                if (!children) {
                    return <p>{'&nbsp;'}</p>;
                }

                const typoStyle = headingToTypoStyle[tag];
                const TypoComponent = typoToComponent[typoStyle];

                return (
                    // H1 tags should only be used for the page title
                    <TypoComponent tag={tag === 'h1' ? 'h2' : tag}>
                        {domToReact(children, replaceElements)}
                    </TypoComponent>
                );
            }

            if (tag === 'p' && children) {
                return (
                    <Normaltekst>
                        {domToReact(children, replaceElements)}
                    </Normaltekst>
                );
            }

            if (tag === 'a') {
                const href = attribs?.href?.replace('https://www.nav.no', '');

                return children ? (
                    <LenkeInline {...props} href={href}>
                        {domToReact(children, replaceElements)}
                    </LenkeInline>
                ) : (
                    <Fragment />
                );
            }

            // Remove empty lists
            if (tag === 'ul') {
                if (!children) {
                    return <Fragment />;
                }

                return (
                    <ul {...props}>{domToReact(children, replaceElements)}</ul>
                );
            }

            if (tag === 'table') {
                return (
                    <table className={'tabell tabell--stripet'} {...props}>
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
