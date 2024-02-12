import { translationsBundleEn as en } from './en';
import { translationsBundleNn as nn } from './nn';
import {
    translationsBundleNb as defaultPack,
    Translations,
    PartialTranslations,
} from './default';

import { Language } from './types';

const supportedLanguages: Record<Language, PartialTranslations> = {
    en: en,
    nn: nn,
    no: defaultPack,
};

export const translator = <Module extends keyof Translations>(
    module: Module,
    language: Language
) => {
    const selectedLanguage = supportedLanguages[language];
    const pack = {
        ...defaultPack[module],
        ...(selectedLanguage && selectedLanguage[module]),
    };

    return <Key extends keyof Translations[Module]>(key: Key) => pack[key];
};
