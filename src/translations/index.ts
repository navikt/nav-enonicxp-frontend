import { translationsBundleSe as se } from './se';
import { translationsBundleEn as en } from './en';
import { translationsBundlePl as pl } from './pl';
import { translationsBundleNn as nn } from './nn';
import { translationsBundleNb as defaultPack, Translations } from './default';

export type Language = 'no' | 'nn' | 'en' | 'se' | 'pl';

const supportedLanguages: { [key in Language]: Translations } = {
    en: en,
    se: se,
    pl: pl,
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

    return <Key extends keyof Translations[Module]>(key: Key) =>
        pack[key] || '';
};
