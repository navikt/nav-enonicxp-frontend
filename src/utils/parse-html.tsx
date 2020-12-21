import { DomElement } from 'domhandler';
import htmlReactParser, { domToReact } from 'html-react-parser';
import React, { Fragment } from 'react';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { LenkeInline } from '../components/_common/lenke/LenkeInline';

interface ParseProps {
    removeEmpty?: boolean,
    macros ?: boolean,
    tableContent ?: boolean,
    tableAttribs ?: boolean,
    tableClass ?: boolean,
}

const stripSpaces = ( text: string ) => {
    return text.replace(/(\s|&nbsp;)*/, '');
};

export const parseHtmlByProps = (content: string, props: ParseProps) => {
    const { removeEmpty, macros, tableContent, tableAttribs, tableClass} = props;
    const replaceElements = {
        replace: ({ name, attribs, children }: DomElement) => {

            // Propsbased parsing - remove empty (incl. all spaces) tags
            if ( removeEmpty && name ) {
                if (name?.toLowerCase().match(/h\d/gm)) {
                    // Empty h-tags -> empty p
                    // Strip all spaces if children are just text
                    if (children && children.length === 1 && children[0].type === 'text') {
                        children[0].data = stripSpaces(children[0].data);
                        if (children[0].data.length === 0) {
                            return <p/>;
                        }
                    }
                    if (!children) {
                        return <p/>;
                    }
                } else {
                    // Remove all other empty tags (except p & th)
                    if (name?.toLowerCase() !== 'p' && name?.toLowerCase() !== 'th') {
                        // Strip all spaces if children are just text
                        if (children && children.length === 1 && children[0].type === 'text') {
                            children[0].data = stripSpaces(children[0].data);
                            if (children[0].data.length === 0) {
                                return <Fragment/>;
                            }
                        }
                    }
                }
                if (!children) {
                    // Remove remaining empty tags
                    return <Fragment/>;
                }
            }
            // Replace h1 - remove if empty
            if (name?.toLowerCase() === 'h1') {
                if ( children ) {
                    // Strip all spaces if children are just text
                    if (children[0].type === 'text') {
                        children[0].data = stripSpaces(children[0].data);
                    }
                    if (children[0].data.length > 0) {
                        return (
                            <Innholdstittel>
                                {domToReact(children, replaceElements)}
                            </Innholdstittel>
                        );
                    }
                }
                return <Fragment/>;
            }
            // Replace p - allow empty
            if (name?.toLowerCase() === 'p') {
                return (
                    <Normaltekst>
                        {domToReact(children, replaceElements)}
                    </Normaltekst>
                );
            }
            // Propsbased parsing - XP macros need replacement of classes
            if ( macros &&
                name?.toLowerCase() === 'a' && attribs?.href && children
            ) {
                const href = attribs.href.replace('https://www.nav.no', '');
                // Noen XP-macroer må få nye klasser
                if (
                    attribs?.class?.includes('macroButton') ||
                    attribs?.class?.includes('btn-link')
                ) {
                    let className = 'knapp';
                    if (
                        attribs.class.includes('macroButtonBlue') ||
                        attribs.class.includes('btn-primary')
                    ) {
                        className += ' knapp--hoved';
                    }
                    attribs.class = className;
                }
                const props = attributesToProps(attribs);
                return (
                    <LenkeInline {...props} href={href}>
                        {domToReact(children)}
                    </LenkeInline>
                );
            }
            // Propsbased parsing - clean up table content
            if ( tableContent ) {
                if (name?.toLowerCase() === 'tr' &&
                    (!children ||
                        children.filter((col) => col.children?.length).length === 0)
                ) {
                    return (
                        <tr
                            {...attributesToProps(attribs)}
                            className={'spacer-row'}
                        />
                    );
                }
                // Remove strong, as it is inconsistently used and we apply font-styling in css instead
                if (name?.toLowerCase() === 'strong') {
                    return <>{domToReact(children)}</>;
                }
            }
        },
    };
    // Allways remove tabs and linebreaks
    const htmlToParse = content
        .replace(/(\t)/gm, '')
        .replace(/(\r\n|\n|\r)/gm, ' ');

    if ( tableAttribs ) {
        // Remove all table attributes
        htmlToParse.replace(/<table(.*)>/gm, '<table>');
    }
    if ( tableClass ) {
        // Add table classes
        htmlToParse.replace(/<table>/gm, '<table class="tabell tabell--stripet">');
    }

    // Parse and return
    const htmlParsed = htmlReactParser(
        htmlToParse,
        replaceElements
    );
    return <>{htmlParsed}</>;
};