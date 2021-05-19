import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { LenkeInline } from './_common/lenke/LenkeInline';
import { getMediaUrl } from '../utils/urls';
import { Button } from './_common/button/Button';
import '../components/macros/Quote.less';
import '../components/macros/Video.less';
import { LenkeStandalone } from './_common/lenke/LenkeStandalone';

interface Props {
    content?: string;
}

export const ParsedHtml = (props: Props) => {
    const { content } = props;

    if (!content) {
        return null;
    }

    const replaceElements = {
        replace: ({ name, attribs, children }: DomElement) => {
            const tag = name?.toLowerCase();
            const className = attribs?.class || '';

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
