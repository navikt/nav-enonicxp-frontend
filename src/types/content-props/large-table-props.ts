import { ContentType, CustomContentCommonProps } from './_content-common';
import { ProcessedHtmlProps } from '../processed-html-props';

export type LargeTableData = {
    text?: ProcessedHtmlProps;
};

export interface LargeTableProps extends CustomContentCommonProps {
    __typename: ContentType.LargeTable;
    data: LargeTableData;
}
