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
                        <LenkeStandalone {...props} href={href}>
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
