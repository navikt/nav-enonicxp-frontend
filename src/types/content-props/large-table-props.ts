import { ContentType, ContentCommonProps } from './_content-common';
import { ProcessedHtmlProps } from '../processed-html-props';

export type LargeTableData = {
    text?: ProcessedHtmlProps;
};

export interface LargeTableProps extends ContentCommonProps {
    type: ContentType.LargeTable;
    data: LargeTableData;
}
