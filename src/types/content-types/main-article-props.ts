import { ContentType, GlobalSchema } from './_schema';

export interface MainArticleProps extends GlobalSchema {
    __typename: ContentType.MainArticle;
    data: {
        ingress?: string;
        metaDescription?: string;
    };
}
