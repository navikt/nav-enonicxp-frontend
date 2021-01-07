import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LanguageProps } from '../types/language';
import { xpPathToAppPath } from './paths';
import { Language } from '../translations';
import { xpLangToDecoratorLang } from './decorator-utils';

export const getContentLanguages = (
    content: ContentProps
): LanguageProps[] | null => {
    if (
        content.__typename === ContentType.MainArticle ||
        content.__typename === ContentType.MainArticleChapter ||
        content.__typename === ContentType.PageList
    ) {
        return content.data.languages;
    }

    return null;
};

export const getDecoratorLanguagesParam = (
    languages: LanguageProps[],
    currentLang: Language,
    currentPath: string
) =>
    languages?.length > 0
        ? languages
              .map((lang) => ({
                  locale: xpLangToDecoratorLang[lang.language],
                  url: xpPathToAppPath(lang._path),
              }))
              .concat([
                  {
                      locale: xpLangToDecoratorLang[currentLang],
                      url: xpPathToAppPath(currentPath),
                  },
              ])
        : [];
