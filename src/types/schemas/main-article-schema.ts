import { ContentType, GlobalSchema } from './_schemas';

export interface MainArticleSchema extends GlobalSchema {
    type: ContentType.MainArticle;
    data: {
        ingress?: string;
    };
}
