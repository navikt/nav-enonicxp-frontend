import {
    ContentType,
    ContentProps,
    ContentAndMediaCommonProps,
    ContentCommonProps,
} from './_content-common';
import { MainArticleProps } from './main-article-props';

export type MainArticleChapterData = Partial<{
    article: MainArticleProps;
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

export type MainArticleChapterProps = ContentCommonProps & {
    type: ContentType.MainArticleChapter;
    parent: ParentProps;
    data: MainArticleChapterData;
};
