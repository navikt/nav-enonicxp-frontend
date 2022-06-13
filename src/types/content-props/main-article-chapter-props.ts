import {
    ContentType,
    CustomContentProps,
    ContentCommonProps,
    CustomContentCommonProps,
} from './_content-common';
import { LanguageProps } from '../language';
import { MainArticleProps } from './main-article-props';

export type MainArticleChapterData = Partial<{
    article: MainArticleProps;
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
} & CustomContentProps;

export interface MainArticleChapterProps extends CustomContentCommonProps {
    __typename: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
}
