import { ContentType, GlobalContentProps } from './_common';

export interface LargeTableProps extends GlobalContentProps {
    __typename: ContentType.LargeTable;
    data: {
        text?: string;
    };
}
