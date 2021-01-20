import { Language } from '../translations';
import { Breadcrumb } from '../types/breadcrumb';
import { getContentLanguages, getDecoratorLanguagesParam } from './languages';
import { ContentProps } from '../types/content-props/_content-common';

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

export const getDecoratorParams = (content: ContentProps): DecoratorParams => {
    const { _path, breadcrumbs, language } = content;
    const rolePath = _path.split('/')[3];
    const context = pathToRoleContext[rolePath];

    return {
        ...(context && { context }),
        language: xpLangToDecoratorLang[language] || 'nb',
        breadcrumbs:
            breadcrumbs?.map((crumb) => ({
                handleInApp: true,
                ...crumb,
            })) || [],
        availableLanguages: getDecoratorLanguagesParam(
            getContentLanguages(content),
            language,
            _path
        ),
    };
};
