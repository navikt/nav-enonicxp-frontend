import {
    ContentType,
    ContentProps,
    ContentCommonProps,
} from './_content-common';
import { LanguageProps } from '../language';

export type MainArticleChapterData = Partial<{
    article: ContentProps;
    languages: LanguageProps[];
}>;

export type MainArticleChapterNavigationData = {
    data: {
        article: ContentCommonProps;
    };
} & ContentCommonProps;

type ParentProps = {
    data?: {
        chapters?: MainArticleChapterNavigationData[];
    };
} & ContentProps;

export interface MainArticleChapterProps extends ContentProps {
    __typename: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
}
