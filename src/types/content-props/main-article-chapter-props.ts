import { ContentType, GlobalContentProps } from './_content-common';
import { MainArticleProps } from './main-article-props';

export type MainArticleChapterData = Partial<{
    article: MainArticleProps;
}>;

type ParentProps = {
    children: GlobalContentProps[];
} & GlobalContentProps;

export interface MainArticleChapterProps extends GlobalContentProps {
    __typename: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
}
