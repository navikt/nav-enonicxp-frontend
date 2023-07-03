import React from 'react';
import { LargeTableProps } from 'types/content-props/large-table-props';
import { ParsedHtml } from '../../_common/parsed-html/ParsedHtml';

import style from './LargeTablePage.module.scss';

export const LargeTablePage = (content: LargeTableProps) => {
    return (
        <div className={style.largeTablePage}>
            <ParsedHtml htmlProps={content.data.text} />
        </div>
    );
};
