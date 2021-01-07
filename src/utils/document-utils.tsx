import React from 'react';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import { Breadcrumb } from '../types/breadcrumb';
import { DocumentContext } from 'next/document';
import { decoratorParams404 } from '../components/pages/error-page/errorcode-content/Error404Content';
import { appPathToXpPath, xpServiceUrl } from './paths';
import { Language } from '../translations';
import NodeCache from 'node-cache';
import { LanguageProps } from '../types/language';
import { getDecoratorLanguagesParam } from './languages';

const decoratorUrl = process.env.DECORATOR_URL;

const cache = new NodeCache({ stdTTL: 60 });

type DecoratorContext = 'privatperson' | 'arbeidsgiver' | 'samarbeidspartner';
type DecoratorLanguage = 'en' | 'nb' | 'nn' | 'pl' | 'se';
type DecoratorLanguageParams = {
    locale: DecoratorLanguage;
    url: string;
};

export type DecoratorFragments = {
    HEADER: React.ReactNode;
    FOOTER: React.ReactNode;
    SCRIPTS: React.ReactNode;
    STYLES: React.ReactNode;
};

export type DecoratorParams = Partial<{
    availableLanguages: DecoratorLanguageParams[];
    breadcrumbs: Breadcrumb[];
    chatbot: boolean;
    feedback: boolean;
    context: DecoratorContext;
    language: DecoratorLanguage;
}>;

export type DocumentParams = {
    decoratorParams: DecoratorParams;
    language?: Language;
};

type DecoratorProps = {
    currentLanguage: Language;
    languages?: LanguageProps[];
    breadcrumbs?: Breadcrumb[];
};

const decoratorParamsDefault = {
    chatbot: true,
};

const fetchDecoratorProps = (
    idOrPath: string,
    isDraft = false
): Promise<DecoratorProps> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
    });
    const url = `${xpServiceUrl}/decoratorProps${params}`;

    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch decorator props from ${idOrPath}: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);
};

const fetchDecorator = (query?: string) => {
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

export const xpLangToDecoratorLang: {
    [key in Language]: DecoratorLanguage;
} = {
    en: 'en',
    no: 'nb',
    pl: 'pl',
    se: 'se',
};

export const pathToRoleContext: { [key: string]: DecoratorContext } = {
    person: 'privatperson',
    bedrift: 'arbeidsgiver',
    samarbeidspartner: 'samarbeidspartner',
};

export const paramsFromContext = async (
    ctx: DocumentContext
): Promise<DocumentParams> => {
    if (ctx.pathname === '/404') {
        return { decoratorParams: decoratorParams404, language: 'no' };
    }

    const path = ctx.asPath;

    const rolePath = path.split('/')[2];
    const context = pathToRoleContext[rolePath];

    const {
        currentLanguage,
        languages,
        breadcrumbs,
    } = await fetchDecoratorProps(appPathToXpPath(path));

    const availableLanguages = getDecoratorLanguagesParam(
        languages,
        currentLanguage,
        path
    );

    return {
        decoratorParams: {
            ...(breadcrumbs && { breadcrumbs }),
            ...(availableLanguages && { availableLanguages }),
            ...(context && { context }),
            language: xpLangToDecoratorLang[currentLanguage] || 'nb',
        },
        language: currentLanguage,
    };
};

const decoratorCSR = (query: string) => ({
    HEADER: <div id="decorator-header"></div>,
    STYLES: <link href={`${decoratorUrl}/css/client.css`} rel="stylesheet" />,
    FOOTER: <div id="decorator-footer"></div>,
    SCRIPTS: (
        <>
            <div
                id="decorator-env"
                data-src={`${decoratorUrl}/env${query}`}
            ></div>
            <script async={true} src={`${decoratorUrl}/client.js`}></script>
        </>
    ),
});

export const getDecorator = async (params: DecoratorParams) => {
    const query = objectToQueryString({ ...decoratorParamsDefault, ...params });

    const decoratorElementsCached = cache.get(query);

    if (decoratorElementsCached) {
        return decoratorElementsCached;
    }

    const decoratorHtml = await fetchDecorator(query);

    // Fallback to client-side rendered decorator if fetch failed
    if (!decoratorHtml) {
        return decoratorCSR(query);
    }

    const { document } = new JSDOM(decoratorHtml).window;

    const decoratorElements = {
        HEADER: parse(document.getElementById('header-withmenu').innerHTML),
        STYLES: parse(document.getElementById('styles').innerHTML),
        FOOTER: parse(document.getElementById('footer-withmenu').innerHTML),
        SCRIPTS: parse(document.getElementById('scripts').innerHTML),
    };

    cache.set(query, decoratorElements);

    return decoratorElements;
};
