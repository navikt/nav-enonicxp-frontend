import React from 'react';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ProcessedHtmlProps } from 'types/processed-html-props';

const injectTableOfContentsIds = (htmlText: string) => {
    let index = 1;

    return htmlText.replace(/<h3>/g, () => `<h3 id="chapter-${index++}" class="chapter-header">`);
};

type Props = {
    htmlProps: ProcessedHtmlProps;
    className: string;
    hasTableOfContents?: boolean;
};

export const Artikkeltekst = ({ htmlProps, className, hasTableOfContents }: Props) => {
    const html = hasTableOfContents
        ? injectTableOfContentsIds(htmlProps.processedHtml)
        : htmlProps.processedHtml;

    return (
        <div className={className}>
            <ParsedHtml htmlProps={{ ...htmlProps, processedHtml: html }} />
        </div>
    );
};
