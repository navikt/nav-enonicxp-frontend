import { ContentType, GlobalPageSchema } from './_schema';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { MainArticleDataProps } from './main-article-content-props';


export interface MainArticleProps extends GlobalPageSchema {
    __typename: ContentType.MainArticle | ContentType.TemplatePage | ContentType.MainArticleChapter;
    _path: string;
    children: MainArticleChapterProps[];
    parent: undefined;
    displayName: string
    data: MainArticleDataProps;
}


