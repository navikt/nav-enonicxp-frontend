import {
    ContentType,
    ContentProps,
    ContentAndMediaCommonProps,
    ContentCommonProps,
} from './_content-common';
import { LanguageProps } from '../language';
import { MainArticleProps } from './main-article-props';

export type MainArticleChapterData = Partial<{
    article: MainArticleProps;
    languages: LanguageProps[];
}>;

export type MainArticleChapterNavigationData = {
    data: {
        article: MainArticleProps;
    };
} & ContentAndMediaCommonProps;

type ParentProps = {
    data?: {
        chapters?: MainArticleChapterNavigationData[];
    };
} & ContentProps;

export interface MainArticleChapterProps extends ContentCommonProps {
    type: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
}
