import React from 'react';
import { LargeTableProps } from 'types/content-props/large-table-props';
import { makeErrorProps } from 'utils/make-error-props';
import { ErrorPage } from '../error-page/ErrorPage';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';

import style from './LargeTablePage.module.scss';

export const LargeTablePage = (contentData: LargeTableProps) => {
    const html = contentData.data?.text;

    return html || !!contentData.editorView ? (
        <div className={style.largeTablePage}>
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
