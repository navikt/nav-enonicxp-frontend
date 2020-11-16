import * as React from 'react';

const parseInnholdsfortegnelse = (htmlText: string) => {
    const toc = [];
    let count = 0;
    let ch = 1;
    let ind = htmlText.indexOf('<h3>');
    while (ind !== -1 && count < 100) {
        const h2End = ind + 4;
        const ssEnd = htmlText.indexOf('</h3>', ind);
        const ss = htmlText
            .slice(h2End, ssEnd)
            .replace(/<([^>]+)>/gi, '') // Strip html
            .replace(/&nbsp;/gi, ' '); // Replace &nbsp;
        count++;
        toc.push(ss);
        htmlText = htmlText.replace(
            '<h3>',
            '<h3 id="chapter-' + ch++ + '" tabindex="-1" class="chapter-header">'
        );
        ind = htmlText.indexOf('<h3>');
    }

    return toc;
}


interface Props {
    label: string
    innhold: string
}

const Innholdsfortegnelse = (props: Props) => {

    const innholdsfortegnelse = parseInnholdsfortegnelse(props.innhold);

    return (
        <nav className="table-of-contents" data-selected-id>
            <h2 className="visuallyhidden">
                {props.label}
            </h2>
            <ol>
                {innholdsfortegnelse.map((item, index) => (
                    <li key={index}>
                        <a data-ga="toc" href={`#chapter-${index + 1}`}>{item}</a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
export default Innholdsfortegnelse;
