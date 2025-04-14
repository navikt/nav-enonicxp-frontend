import { ContentProps } from 'types/content-props/_content-common';
import { LanguageProps } from 'types/language';
import { Language } from 'translations';

export const getContentLanguages = (content: ContentProps): LanguageProps[] =>
    content.languages ?? [];

const norwegianLanguagesSet: ReadonlySet<string> = new Set(['no', 'nn', 'nb']);

export const isNorwegianLanguage = (language: string) => norwegianLanguagesSet.has(language);

export const pageLanguageToLayerLanguage: { [key in Language]?: Language } = {
    nn: 'nn',
    se: 'se',
    en: 'en',
    ru: 'en',
    uk: 'en',
    pl: 'en',
} as const;
