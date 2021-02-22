import { ContentType, ContentProps } from './_content-common';
import { MainArticleProps } from './main-article-props';
import { LanguageProps } from '../language';

export type MainArticleChapterData = Partial<{
    article: MainArticleProps;
    languages: LanguageProps[];
}>;

export interface MainArticleChapterProps extends ContentProps {
    __typename: ContentType.MainArticleChapter;
    parent: MainArticleProps;
    data: MainArticleChapterData;
}
