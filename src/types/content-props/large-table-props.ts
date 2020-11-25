import { ContentType, ContentProps } from './_content-common';

export type LargeTableData = {
    text?: string;
};

export interface LargeTableProps extends ContentProps {
    __typename: ContentType.LargeTable;
    data: LargeTableData;
}
