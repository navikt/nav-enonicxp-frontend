import { bundle as se } from './se';
import { bundle as en } from './en';
import { bundle as pl } from './pl';
import { bundle as defaultPack, Translations } from './default';

export type Language = 'no' | 'nn' | 'en' | 'se' | 'pl';

const supportedLanguages: { [key in Language]: Translations } = {
    en: en,
    se: se,
    pl: pl,
    no: defaultPack,
    nn: defaultPack,
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
