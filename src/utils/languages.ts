import { ContentProps } from 'types/content-props/_content-common';
import { LanguageProps } from 'types/language';

export const getContentLanguages = (content: ContentProps): LanguageProps[] =>
    content.languages || [];
