import { ContentType, ContentTypeSchemas, GlobalSchema } from './_schemas';

export interface ContentListSchema extends GlobalSchema {
    type: ContentType.ContentList;
    data: {
        sectionContents: ContentTypeSchemas[];
    };
}
