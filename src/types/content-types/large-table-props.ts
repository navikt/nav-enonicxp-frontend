import { ContentType, GlobalContentSchema } from './_schema';

export interface LargeTableProps extends GlobalContentSchema {
    __typename: ContentType.LargeTable;
    data: {
        text?: string;
    };
}
