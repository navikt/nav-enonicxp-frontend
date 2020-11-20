import { ContentType, ContentTypeSchema, GlobalContentSchema } from './_schema';

export interface ContentListProps extends GlobalContentSchema {
    __typename: ContentType.ContentList;
    data: {
        sectionContents: ContentTypeSchema[];
    };
}
