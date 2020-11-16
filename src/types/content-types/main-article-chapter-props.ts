import { ContentType, GlobalSchema } from './_schema';
import { MainArticleProps } from './main-article-props';
import { MainArticleDataProps } from './main-article-content-props';

interface ArticleProps extends GlobalSchema {
    data: MainArticleDataProps;
    publish?: {
        from: string;
    };
    _path: string;
    displayName: string
}

export interface MainArticleChapterDataProps {
    article: ArticleProps
}


export interface MainArticleChapterProps extends GlobalSchema {
    __typename: ContentType.MainArticleChapter;
    children: undefined;
    parent: MainArticleProps;
    data: MainArticleChapterDataProps;
}
