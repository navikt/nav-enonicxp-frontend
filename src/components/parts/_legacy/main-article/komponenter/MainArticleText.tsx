import * as React from 'react';
import { ParsedHtml } from '../../../../_common/parsed-html/ParsedHtml';
import { ProcessedHtmlProps } from '../../../../../types/processed-html-props';

const modifyHtml = (htmlText: string, hasTableOfContent: boolean) => {
    if (!htmlText) {
        return '';
    }

    // Fjern tomme headings og br-tagger fra HTML
    let tmp = htmlText;
    tmp = tmp?.replace(/<h\d>\s*<\/h\d>/g, '');
    tmp = tmp?.replace(/<h\d>&nbsp;<\/h\d>/g, '');
    tmp = tmp?.replace(/<br \/>/g, '');

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
    htmlProps: ProcessedHtmlProps;
    className: string;
    hasTableOfContents: boolean;
}

const MainArticleText = ({
    htmlProps,
    className,
    hasTableOfContents,
}: Props) => {
    const modifiedHtml = modifyHtml(
        htmlProps?.processedHtml,
        hasTableOfContents
    );

    return (
        <div className={className}>
            <ParsedHtml
                htmlProps={{ ...htmlProps, processedHtml: modifiedHtml }}
            />
        </div>
    );
};
export default MainArticleText;
