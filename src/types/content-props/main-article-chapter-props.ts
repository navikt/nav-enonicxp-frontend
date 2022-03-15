import { ContentType, ContentProps } from './_content-common';
import { LanguageProps } from '../language';

export type MainArticleChapterData = Partial<{
    article: ContentProps;
    languages: LanguageProps[];
}>;

type ParentProps = {
    data?: {
        chapters?: Omit<MainArticleChapterProps, 'parent'>[];
    };
} & ContentProps;

export interface MainArticleChapterProps extends ContentProps {
    __typename: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
}
