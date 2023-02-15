import { ContentProps } from 'types/content-props/_content-common';
import { LanguageProps } from 'types/language';

// TODO: remove after backend changes are in production
const legacyLanguages = (content: ContentProps) =>
    Array.isArray(content.data?.languages) ? content.data.languages : null;

export const getContentLanguages = (
    content: ContentProps
): LanguageProps[] | null => {
    return content.languages || legacyLanguages(content);
};
