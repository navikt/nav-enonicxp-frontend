import { ContentType, ContentTypeSchema, GlobalSchema } from './_schema';

export interface ContentListProps extends GlobalSchema {
    __typename: ContentType.ContentList;
    data: {
        sectionContents: ContentTypeSchema[];
    };
}
