import * as React from 'react';
import { ParsedHtml } from '../../ParsedHtml';

const modifyHtml = (htmlText: string, hasTableOfContent: boolean) => {
    // Fjern tomme headings og br-tagger fra HTML
    let tmp = htmlText;
    tmp = tmp?.replace(/<h\d>\s*<\/h\d>/g, '');
    tmp = tmp?.replace(/<h\d>&nbsp;<\/h\d>/g, '');
    tmp = tmp?.replace(/<br \/>/g, '');

    console.log(htmlText);

    // legg på id'er for innholdsfortegnelse
    if (hasTableOfContent) {
        let index = 1;
        tmp = tmp?.replace(/<h3>/g, () => {
            return `<h3 id="chapter-${index++}" class="chapter-header">`;
        });
    }

    return tmp;
};

interface Props {
    text: string;
    className: string;
    hasTableOfContents: boolean;
}

const MainArticleText = (props: Props) => {
    const modifiedHtml = modifyHtml(props.text, props.hasTableOfContents);

    return (
        <div className={props.className}>
            <ParsedHtml content={modifiedHtml} />
        </div>
    );
};
export default MainArticleText;
