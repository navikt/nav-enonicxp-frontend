import React from 'react';
import { fetchWithTimeout } from './fetch-utils';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import NodeCache from 'node-cache';
import { Language } from '../translations';
import { Breadcrumb } from '../types/breadcrumb';
import { getContentLanguages } from './languages';
import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { LanguageProps } from '../types/language';
import { xpPathToPathname } from './paths';

const decoratorUrl = process.env.DECORATOR_URL;
const cache = new NodeCache({ stdTTL: 60 });

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

export type DecoratorFragments = {
    HEADER: React.ReactNode;
    FOOTER: React.ReactNode;
    SCRIPTS: React.ReactNode;
    STYLES: React.ReactNode;
};

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
                  url: xpPathToPathname(lang._path),
              }))
              .concat([
                  {
                      handleInApp: true,
                      locale: xpLangToDecoratorLang[currentLang],
                      url: xpPathToPathname(currentPath),
                  },
              ])
        : [];

const pathToRoleContext: { [key: string]: DecoratorContext } = {
    person: 'privatperson',
    bedrift: 'arbeidsgiver',
    samarbeidspartner: 'samarbeidspartner',
};

const fetchDecoratorHtml = (query?: string) => {
    const url = `${decoratorUrl}/${query ? query : ''}`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.text();
            }
            const error = `Failed to fetch decorator from ${url}: ${res.status} - ${res.statusText}`;
            throw Error(error);
        })
        .catch(console.error);
};

const decoratorFragmentsCSR = (query?: string) => ({
    HEADER: <div id="decorator-header"></div>,
    STYLES: <link href={`${decoratorUrl}/css/client.css`} rel="stylesheet" />,
    FOOTER: <div id="decorator-footer"></div>,
    SCRIPTS: (
        <>
            <div
                id="decorator-env"
                data-src={`${decoratorUrl}/env${query || ''}`}
            ></div>
            <script async={true} src={`${decoratorUrl}/client.js`}></script>
        </>
    ),
});

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
    };
};

export const getDecoratorFragments = async (
    query?: string
): Promise<DecoratorFragments> => {
    const cacheKey = query || 'default';
    if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
    }

    const decoratorHtml = await fetchDecoratorHtml(query);

    // Fallback to client-side rendered decorator if fetch failed
    if (!decoratorHtml) {
        return decoratorFragmentsCSR(query);
    }

    const { document } = new JSDOM(decoratorHtml).window;
    const decoratorFragments = {
        HEADER: parse(document.getElementById('header-withmenu').innerHTML),
        STYLES: parse(document.getElementById('styles').innerHTML),
        FOOTER: parse(document.getElementById('footer-withmenu').innerHTML),
        SCRIPTS: parse(document.getElementById('scripts').innerHTML),
    };

    cache.set(cacheKey, decoratorFragments);

    return decoratorFragments;
};
