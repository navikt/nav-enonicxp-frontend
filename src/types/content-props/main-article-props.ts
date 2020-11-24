import { MainArticleChapterProps } from './main-article-chapter-props';
import { MainArticleDataProps } from './main-article-content-props';
import { ContentType, GlobalPageProps } from './_content-common';

export interface MainArticleProps extends GlobalPageProps {
    __typename:
        | ContentType.MainArticle
        | ContentType.TemplatePage
        | ContentType.MainArticleChapter;
    _path: string;
    children?: MainArticleChapterProps[];
    parent?: undefined;
    displayName: string;
    data: MainArticleDataProps;
}
