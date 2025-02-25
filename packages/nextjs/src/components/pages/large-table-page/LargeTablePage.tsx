import React from 'react';
import { LargeTableProps } from 'types/content-props/large-table-props';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';

import style from './LargeTablePage.module.scss';

export const LargeTablePage = (content: LargeTableProps) => {
    return content.data.text ? (
        <div className={style.largeTablePage}>
            <ParsedHtml htmlProps={content.data.text} />
        </div>
    ) : null;
};
