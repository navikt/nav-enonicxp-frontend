import * as React from 'react';
import { LenkeUstylet } from '../_common/lenke/LenkeUstylet';

export const parseInnholdsfortegnelse = (htmlText: string) => {
    const innholdsfortegnelse = [];
    let modifiedHtml = htmlText;
    let count = 0;
    let chapter = 1;
    let hTagStart = modifiedHtml.indexOf('<h3>');
    while (hTagStart !== -1 && count < 100) {
        console.log('1', hTagStart)
        const hTagEnd = hTagStart + 4;
        const hEndTagStart = modifiedHtml.indexOf('</h3>', hTagStart);
        const headerText = modifiedHtml
            .slice(hTagEnd, hEndTagStart)
            .replace(/<([^>]+)>/gi, '') // Strip html
            .replace(/&nbsp;/gi, ' '); // Replace &nbsp;

        count++;
        innholdsfortegnelse.push(headerText);
        modifiedHtml = modifiedHtml.replace(
            '<h3>',
            '<h3 id="chapter-' + chapter++ + '" tabindex="-1" class="chapter-header">'
        );
        hTagStart = modifiedHtml.indexOf('<h3>');
    }

    return {
        innholdsfortegnelse: innholdsfortegnelse,
        modifiedHtml: modifiedHtml
    };
}


interface Props {
    label: string
    innholdsfortegnelse: string[]
}

const Innholdsfortegnelse = (props: Props) => {
    return (
        <nav className="table-of-contents" data-selected-id>
            <h2 className="visuallyhidden">
                {props.label}
            </h2>
            <ol>
                {props.innholdsfortegnelse.map((item, index) => (
                    <li key={index}>
                        <LenkeUstylet
                            href={`#chapter-${index + 1}`}
                        >
                            {item}
                        </LenkeUstylet>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
export default Innholdsfortegnelse;
