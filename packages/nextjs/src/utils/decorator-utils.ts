import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { Language } from 'translations';
import { ContentProps, ContentType, innholdsTypeMap } from 'types/content-props/_content-common';
import { LanguageProps } from 'types/language';
import { stripXpPathPrefix } from './urls';
import { getContentLanguages } from './languages';
import { hasWhiteHeader } from './appearance';

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
    languages.length > 0
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

const audienceToRoleContext: {
    [key in Audience]: DecoratorParams['context'];
} = {
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

export const getDecoratorParams = (content: ContentProps): DecoratorParams => {
    if (!content || content.type === ContentType.Error) {
        return errorParams(content);
    }

    const { _path, breadcrumbs, language, data, editorView } = content;
    const audience = data?.audience ? getAudience(data.audience) : undefined;
    const audienceContext = audience ? audienceToRoleContext[audience] : undefined;
    const segments = _path.split('/').filter(Boolean);
    const roleSegment = segments.find((s) => s in pathToRoleContext);
    const pathContext = roleSegment ? pathToRoleContext[roleSegment] : 'privatperson';

    const context: DecoratorParams['context'] =
        audienceContext && audienceContext !== pathContext
            ? pathContext
            : (audienceContext ?? pathContext);

    const decoratorLanguage = getDecoratorLangFromXpLang(language);
    const feedbackEnabled = data?.feedbackToggle;
    const chatbotDisabled =
        data?.chatbotToggle === false || editorView === 'edit' || editorView === 'inline';
    const pageType = innholdsTypeMap[content.type];
    const useSimpleDecorator = content.type === ContentType.FormIntermediateStepPage;

    return {
        ...defaultParams,
        ...(context && { context }),
        ...(decoratorLanguage && { language: decoratorLanguage }),
        pageType,
        breadcrumbs:
            breadcrumbs?.map((crumb) => ({
                ...crumb,
                handleInApp: true,
                analyticsTitle: crumb.title,
            })) || [],
        availableLanguages: getDecoratorLanguagesParam(
            getContentLanguages(content),
            language,
            _path
        ),
        ...(feedbackEnabled && { feedback: true }),
        chatbot: !chatbotDisabled,
        utilsBackground: hasWhiteHeader(content) ? 'white' : 'gray',
        simple: useSimpleDecorator,
    };
};
