import React, { Fragment } from 'react';
import htmlReactParser, { DomElement, domToReact } from 'html-react-parser';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import { LargeTableProps } from '../../../types/content-props/large-table-props';
import { makeErrorProps } from '../../../utils/make-error-props';
import { ErrorPage } from '../error-page/ErrorPage';
import { getProcessedHtmlPropsWithBackwardsCompatibility } from '../../../types/processed-html-props';
import './LargeTablePage.less';

const parseHtml = (htmlString: string) => {
    const options = {
        replace: ({ name, attribs, children }: DomElement) => {
            // Replace rows with no content with an easily styled element
            if (
                name?.toLowerCase() === 'tr' &&
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

            // Remove empty footers etc
            if (
                name?.toLowerCase() === 'div' &&
                (!children || children.length === 0)
            ) {
                return <Fragment />;
            }
        },
    };

    const htmlParsed = htmlReactParser(
        // remove whitespace
        htmlString.replace(/(\t|\n|\r|&nbsp;)/gm, ''),
        options
    );

    return <>{htmlParsed}</>;
};

export const LargeTablePage = (contentData: LargeTableProps) => {
    const html = getProcessedHtmlPropsWithBackwardsCompatibility(
        contentData.data.text
    );

    return html || contentData.editMode ? (
        <div className={'large-table-page'}>
            {html ? parseHtml(html.processedHtml) : ''}
        </div>
    ) : (
        <ErrorPage
            {...makeErrorProps(
                contentData._path,
                'Table content not found',
                404
            )}
        />
    );
};

export default LargeTablePage;
