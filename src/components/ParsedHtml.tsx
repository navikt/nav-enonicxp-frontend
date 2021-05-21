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
import './macros/Quote.less';
import './macros/Video.less';

const parsedHtmlLegacy = (content: string) => {
    if (!content) {
        return null;
    }

    const replaceElements = {
        replace: ({ name, attribs, children }: DomElement) => {
            if (name?.toLowerCase() === 'img' && attribs?.src) {
                return (
                    <img
                        {...attributesToProps(attribs)}
                        alt={attribs.alt || ''}
                        src={getMediaUrl(attribs.src)}
                    />
                );
            }

            if (name?.toLowerCase() === 'h1' && children) {
                return (
                    <Innholdstittel>
                        {domToReact(children, replaceElements)}
                    </Innholdstittel>
                );
            }

            if (name?.toLowerCase() === 'p' && children) {
                return (
                    <Normaltekst>
                        {domToReact(children, replaceElements)}
                    </Normaltekst>
                );
            }

            if (name?.toLowerCase() === 'a' && attribs?.href && children) {
                const href = attribs.href.replace('https://www.nav.no', '');
                const className = attribs?.class;

                if (
                    className &&
                    (className.includes('macroButton') ||
                        className.includes('btn-link'))
                ) {
                    return (
                        <Button
                            href={href}
                            type={
                                attribs.class.includes('macroButtonBlue') ||
                                attribs.class.includes('btn-primary')
                                    ? 'hoved'
                                    : 'standard'
                            }
                        >
                            {domToReact(children)}
                        </Button>
                    );
                }

                const props = attributesToProps(attribs);

                if (className && className.includes('chevron')) {
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
        replace: ({ name, attribs, children }: DomElement) => {
            const tag = name?.toLowerCase();

            if (tag === processedHtmlMacroTag) {
                return (
                    <MacroMapper
                        macros={macros}
                        macroRef={attribs?.['data-macro-ref']}
                    />
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

            if (tag === 'h1') {
                return children ? (
                    <Innholdstittel>
                        {domToReact(children, replaceElements)}
                    </Innholdstittel>
                ) : (
                    <Fragment />
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
                const props = attributesToProps(attribs);

                return children ? (
                    <LenkeInline {...props} href={href}>
                        {domToReact(children)}
                    </LenkeInline>
                ) : (
                    <Fragment />
                );
            }
        },
    };

    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        processedHtml
            .replace(/(\r\n|\n|\r)/gm, ' ')
            .replace(/(<table)/gm, '<table class="tabell tabell--stripet"'),
        replaceElements
    );

    return <>{htmlParsed}</>;
};
