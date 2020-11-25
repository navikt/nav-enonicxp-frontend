import { ContentType, ContentProps } from './_content-common';
import { MainArticleProps } from './main-article-props';

export type MainArticleChapterData = Partial<{
    article: MainArticleProps;
}>;

type ParentProps = {
    children: ContentProps[];
} & ContentProps;

export interface MainArticleChapterProps extends ContentProps {
    __typename: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
}
