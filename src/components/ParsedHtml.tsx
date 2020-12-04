import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { LenkeInline } from './_common/lenke/LenkeInline';
import '../components/macros/Quote.less';
import '../components/macros/Video.less';

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
                // Noen XP-macroer må få nye klasser
                if (attribs?.class?.includes('macroButton')) {
                    let className = 'knapp';
                    if (attribs.class.includes('macroButtonBlue')) {
                        className += ' knapp--hoved';
                    }
                    attribs.class = className;
                }
                const props = attributesToProps(attribs);

                return (
                    <LenkeInline {...props} href={href}>
                        {children && domToReact(children)}
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
