import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LanguageProps } from '../types/language';

export const getContentLanguages = (
    content: ContentProps
): LanguageProps[] | null => {
    if (!content?.__typename) {
        return null;
    }

    if (
        content.__typename === ContentType.MainArticle ||
        content.__typename === ContentType.PageList ||
        content.__typename === ContentType.MainArticleChapter
    ) {
        return content.data?.languages;
    }

    return null;
};
