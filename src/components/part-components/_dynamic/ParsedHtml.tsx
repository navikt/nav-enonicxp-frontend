import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { xpLegacyPath, isXpPath } from '../../../utils/paths';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import Link from 'next/link';
import Lenke from 'nav-frontend-lenker';
import { ParseMacro } from './Macros';


interface Props {
    content?: string;
}

export const ParsedHtml = (props: Props) => {
    const { content } = props;

    if (!content) {
        return null;
    }

    const replaceElements = {
        replace: ({ name, attribs, type, data, children }: DomElement) => {

            if (type?.toLowerCase() === 'comment') {
                return ParseMacro(data);
            }

            if (name?.toLowerCase() === 'h1') {
                return (
                    <Innholdstittel>
                        {children && domToReact(children, replaceElements)}
                    </Innholdstittel>
                );
            }

            if (name?.toLowerCase() === 'p') {
                return (
                    <Normaltekst>
                        {children && domToReact(children, replaceElements)}
                    </Normaltekst>
                );
            }

            if (name?.toLowerCase() === 'a' && attribs?.href) {
                const href = attribs.href
                    .replace(xpLegacyPath, '')
                    .replace('https://www.nav.no', '');
                const props = attributesToProps(attribs);

                return isXpPath(href) ? (
                    <Link href={href} passHref={true}>
                        <Lenke {...props}>
                            {children && domToReact(children)}
                        </Lenke>
                    </Link>
                ) : (
                    <Lenke {...props} href={href}>
                        {children && domToReact(children)}
                    </Lenke>
                );
            }
        },
    };

    // htmlReactParser does not always handle linebreaks well...
    const htmlParsed = htmlReactParser(
        content.replace(/(\r\n|\n|\r)/gm, ' '),
        replaceElements
    );

    return <>{htmlParsed}</>;
};
