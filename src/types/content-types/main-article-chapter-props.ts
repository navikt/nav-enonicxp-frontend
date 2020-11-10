import { ContentType, GlobalSchema } from './_schema';
import { MainArticleProps } from './main-article-props';

export interface MainArticleChapterProps extends GlobalSchema {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: {
        ingress?: string;
        metaDescription?: string;
    };
}
