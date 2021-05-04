import { Language } from '../translations';
import { Breadcrumb } from '../types/breadcrumb';
import { getContentLanguages } from './languages';
import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LanguageProps } from '../types/language';
import { stripXpPathPrefix } from './urls';

type DecoratorContext = 'privatperson' | 'arbeidsgiver' | 'samarbeidspartner';
type DecoratorLanguage = 'en' | 'nb' | 'nn' | 'pl' | 'se';
type DecoratorLanguageParams = {
    locale: DecoratorLanguage;
    url: string;
    handleInApp?: boolean;
};

export type DecoratorParams = Partial<{
    availableLanguages: DecoratorLanguageParams[];
    breadcrumbs: Breadcrumb[];
    chatbot: boolean;
    feedback: boolean;
    context: DecoratorContext;
    language: DecoratorLanguage;
}>;

const xpLangToDecoratorLang: {
    [key in Language]: DecoratorLanguage;
} = {
    en: 'en',
    no: 'nb',
    nn: 'nn',
    pl: 'pl',
    se: 'se',
};

const getDecoratorLanguagesParam = (
    languages: LanguageProps[],
    currentLang: Language,
    currentPath: string
): DecoratorLanguageParams[] =>
    languages?.length > 0
        ? languages
              .map((lang) => ({
                  handleInApp: true,
                  locale: xpLangToDecoratorLang[lang.language],
                  url: stripXpPathPrefix(lang._path),
              }))
              .concat([
                  {
                      handleInApp: true,
                      locale: xpLangToDecoratorLang[currentLang],
                      url: stripXpPathPrefix(currentPath),
                  },
              ])
        : [];

const pathToRoleContext: { [key: string]: DecoratorContext } = {
    person: 'privatperson',
    bedrift: 'arbeidsgiver',
    samarbeidspartner: 'samarbeidspartner',
};

const errorParams = (content: ContentProps): DecoratorParams => ({
    feedback: false,
    breadcrumbs: content?.breadcrumbs || [],
});

const defaultParams = {
    feedback: false,
    language: 'nb',
};

export const getDecoratorParams = (content: ContentProps): DecoratorParams => {
    if (!content || content.__typename === ContentType.Error) {
        return errorParams(content);
    }

    const { _path, breadcrumbs, language } = content;
    const rolePath = _path.split('/')[3];
    const context = pathToRoleContext[rolePath];
    const decoratorLanguage = xpLangToDecoratorLang[language];
    const feedback = content.data?.feedbackToggle;
    const chatbotDisabled = content.data?.chatbotToggle === false;

    return {
        ...defaultParams,
        ...(context && { context }),
        ...(decoratorLanguage && { language: decoratorLanguage }),
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
        ...(feedback && { feedback: true }),
        ...(chatbotDisabled && { chatbot: false }),
    };
};
