import { Language } from '../translations';
import { Breadcrumb } from '../types/breadcrumb';

type DecoratorContext = 'privatperson' | 'arbeidsgiver' | 'samarbeidspartner';
type DecoratorLanguage = 'en' | 'nb' | 'nn' | 'pl' | 'se';
type DecoratorLanguageParams = {
    locale: DecoratorLanguage;
    url: string;
};

export type DecoratorParams = Partial<{
    availableLanguages: DecoratorLanguageParams[];
    breadcrumbs: Breadcrumb[];
    chatbot: boolean;
    feedback: boolean;
    context: DecoratorContext;
    language: DecoratorLanguage;
}>;

export const xpLangToDecoratorLang: {
    [key in Language]: DecoratorLanguage;
} = {
    en: 'en',
    no: 'nb',
    nn: 'nn',
    pl: 'pl',
    se: 'se',
};

export const pathToRoleContext: { [key: string]: DecoratorContext } = {
    person: 'privatperson',
    bedrift: 'arbeidsgiver',
    samarbeidspartner: 'samarbeidspartner',
};
