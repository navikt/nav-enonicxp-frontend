import { ContentType, GlobalContentProps } from './_content-common';
import { MainArticleProps } from './main-article-props';
import { MainArticleDataProps } from './main-article-content-props';

export interface ArticleProps extends GlobalContentProps {
    data: MainArticleDataProps;
    publish?: {
        from: string;
    };
    _path: string;
    displayName: string;
}

export interface MainArticleChapterDataProps {
    article: ArticleProps;
}

export interface MainArticleChapterProps extends GlobalContentProps {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: MainArticleChapterDataProps;
}
