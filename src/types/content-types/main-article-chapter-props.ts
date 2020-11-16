import { ContentType, GlobalSchema } from './_schema';
import { MainArticleProps } from './main-article-props';
import { MainArticleDataProps } from './main-article-content-props';

export interface MainArticleChapterDataProps {
    article: {
        data: MainArticleDataProps;
        publish?: {
            from: string;
        };
        language: string;
        _path: string;
        displayName: string
    }
}

export interface MainArticleChapterProps extends GlobalSchema {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: MainArticleChapterDataProps;
}
