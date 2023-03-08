import { Language } from '../../translations';
import { getContentLanguages } from '../languages';
import {
    ContentProps,
    ContentType,
} from '../../types/content-props/_content-common';
import { LanguageProps } from '../../types/language';
import { stripXpPathPrefix } from '../urls';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { checkForWhiteHeader } from '../../components/_top-container/TopContainer';
import { Audience } from '../../types/component-props/_mixins';

const defaultLanguage: DecoratorParams['language'] = 'nb';

const xpLangToDecoratorLang: {
    [key in Language]: DecoratorParams['language'];
} = {
    en: 'en',
    no: 'nb',
    nn: 'nn',
    pl: 'pl',
    se: 'se',
    uk: 'uk',
    ru: 'ru',
};

const getDecoratorLangFromXpLang = (xpLang: Language) =>
    xpLangToDecoratorLang[xpLang] || defaultLanguage;

const getDecoratorLanguagesParam = (
    languages: LanguageProps[],
    currentLang: Language,
    currentPath: string
): DecoratorParams['availableLanguages'] =>
    languages?.length > 0
        ? languages
              .map((lang) => ({
                  handleInApp: true,
                  locale: getDecoratorLangFromXpLang(lang.language),
                  url: stripXpPathPrefix(lang._path),
              }))
              .concat([
                  {
                      handleInApp: true,
                      locale: getDecoratorLangFromXpLang(currentLang),
                      url: stripXpPathPrefix(currentPath),
                  },
              ])
        : [];

const pathToRoleContext: { [key: string]: DecoratorParams['context'] } = {
    person: 'privatperson',
    bedrift: 'arbeidsgiver',
    samarbeidspartner: 'samarbeidspartner',
};

const audienceToRoleContext: { [key in Audience]: DecoratorParams['context'] } =
    {
        [Audience.PERSON]: 'privatperson',
        [Audience.EMPLOYER]: 'arbeidsgiver',
        [Audience.PROVIDER]: 'samarbeidspartner',
    };

const errorParams = (content: ContentProps): DecoratorParams => ({
    feedback: false,
    breadcrumbs: content?.breadcrumbs || [],
});

const defaultParams = {
    feedback: false,
    language: 'nb',
    maskHotjar: false,
};

const taSurveys = {
    taSurveys: '',
};

export const getDecoratorParams = (content: ContentProps): DecoratorParams => {
    if (!content || content.type === ContentType.Error) {
        return errorParams(content);
    }

    const { _path, breadcrumbs, language, data, editorView } = content;

    const rolePath = _path.split('/')[3];
    const context =
        audienceToRoleContext[data?.audience] || pathToRoleContext[rolePath];
    const decoratorLanguage = getDecoratorLangFromXpLang(language);
    const feedbackEnabled = data?.feedbackToggle;
    const chatbotDisabled =
        data?.chatbotToggle === false ||
        editorView === 'edit' ||
        editorView === 'inline';

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
        chatbot: !chatbotDisabled,
        utilsBackground: checkForWhiteHeader(content) ? 'white' : 'gray',
        ...taSurveys,
    };
};
