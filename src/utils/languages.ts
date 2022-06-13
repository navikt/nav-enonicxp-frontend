import { CustomContentProps } from '../types/content-props/_content-common';
import { LanguageProps } from '../types/language';

export const getContentLanguages = (
    content: CustomContentProps
): LanguageProps[] | null => {
    return Array.isArray(content.data?.languages)
        ? content.data.languages
        : null;
};
