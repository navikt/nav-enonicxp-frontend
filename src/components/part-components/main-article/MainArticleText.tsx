import * as React from 'react';
import { ParsedHtml } from '../_dynamic/ParsedHtml';


const cleanupHtml = (htmlText: string) => {
    // Fjern tomme headings og br-tagger fra HTML
    let cleanHtml = htmlText;
    cleanHtml = cleanHtml?.replace(/<h\d>\s*<\/h\d>/g, '');
    cleanHtml = cleanHtml?.replace(/<h\d>&nbsp;<\/h\d>/g, '');
    cleanHtml = cleanHtml?.replace(/<br \/>/g, '');
    return cleanHtml;
}

interface Props {
    text: string,
    className: string
}

const MainArticleText = (props: Props) => {
    return (
        <div className={props.className}>
            <ParsedHtml content={cleanupHtml(props.text)}/>
        </div>
    );
}
export default MainArticleText;
