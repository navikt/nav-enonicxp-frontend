import React from 'react';
import { LargeTableProps } from '../../../types/content-props/large-table-props';
import { makeErrorProps } from '../../../utils/make-error-props';
import { parseHtmlByProps } from '../../../utils/parse-html';
import { ErrorPage } from '../error-page/ErrorPage';
import './LargeTablePage.less';

export const LargeTablePage = (contentData: LargeTableProps) => {
    console.log(contentData.data.text);
    return contentData?.data?.text || contentData?.editMode ? (
        <div className={'large-table-page'}>
            {contentData.data?.text
                ? parseHtmlByProps(contentData.data.text, {
                    tableContent: true,
                    tableAttribs: true,
                })
                : ''
            }
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
