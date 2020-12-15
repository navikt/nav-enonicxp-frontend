import { Language } from '../translations';

export type LanguageSelectorProps = {
    locale: Language;
    url: string;
};

export type LanguageServiceProps = {
    languages: LanguageSelectorProps[];
    currentLanguage: Language;
};
