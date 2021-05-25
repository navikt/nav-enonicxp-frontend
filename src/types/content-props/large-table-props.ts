import { ContentType, ContentProps } from './_content-common';
import { ProcessedHtmlProps } from '../processed-html-props';

export type LargeTableData = {
    text?: ProcessedHtmlProps;
};

export interface LargeTableProps extends ContentProps {
    __typename: ContentType.LargeTable;
    data: LargeTableData;
}
