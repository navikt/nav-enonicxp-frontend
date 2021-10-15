import { Language } from '../translations';
import { getContentLanguages } from './languages';
import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LanguageProps } from '../types/language';
import { stripXpPathPrefix } from './urls';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { contentTypesWithWhiteHeader } from '../components/_common/top-container/TopContainer';

const xpLangToDecoratorLang: {
    [key in Language]: DecoratorParams['language'];
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
): DecoratorParams['availableLanguages'] =>
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

const pathToRoleContext: { [key: string]: DecoratorParams['context'] } = {
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

const taSurveys = {
    taSurveys: '03229',
};

export const getDecoratorParams = (content: ContentProps): DecoratorParams => {
    if (!content || content.__typename === ContentType.Error) {
        return errorParams(content);
    }

    const { _path, breadcrumbs, language } = content;
    const rolePath = _path.split('/')[3];
    const context = pathToRoleContext[rolePath];
    const decoratorLanguage = xpLangToDecoratorLang[language];
    const feedbackEnabled = content.data?.feedbackToggle;
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
        ...(feedbackEnabled && { feedback: true }),
        ...(chatbotDisabled && { chatbot: false }),
        utilsBackground: contentTypesWithWhiteHeader[content.__typename]
            ? 'white'
            : 'gray',
        ...taSurveys,
    };
};
