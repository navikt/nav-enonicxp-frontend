import { ContentType, GlobalSchema } from './_schema';

export interface LargeTableProps extends GlobalSchema {
    __typename: ContentType.LargeTable;
    data: {
        text?: string;
    };
}
