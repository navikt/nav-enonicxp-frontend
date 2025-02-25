import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentType, ContentCommonProps } from './_content-common';

export type LargeTableData = {
    text?: ProcessedHtmlProps;
};

export type LargeTableProps = ContentCommonProps & {
    type: ContentType.LargeTable;
    data: LargeTableData;
};
