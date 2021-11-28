import React from 'react';
import { LargeTableProps } from '../../../types/content-props/large-table-props';
import { makeErrorProps } from '../../../utils/make-error-props';
import { ErrorPage } from '../error-page/ErrorPage';
import { ParsedHtml } from '../../ParsedHtml'
import './LargeTablePage.less';

export const LargeTablePage = (contentData: LargeTableProps) => {
    const html = contentData.data?.text;

    return html || !!contentData.editorView ? (
        <div className={'large-table-page'}>
           <ParsedHtml htmlProps={html} />
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
