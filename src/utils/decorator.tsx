import React from 'react';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import { Breadcrumb } from '../types/breadcrumb';
import { LanguageSelectorProps } from '../types/language-selector-props';
import NodeCache from 'node-cache';
import { DocumentContext } from 'next/document';
import { decoratorParams404 } from '../components/pages/error-page/errorcode-content/Error404Content';
import { appPathToXpPath } from './paths';
import { fetchBreadcrumbs, fetchLanguages } from './fetch-content';
import { Language } from '../translations';

const decoratorUrl = process.env.DECORATOR_URL;

const cache = new NodeCache({ stdTTL: 120 });

type DecoratorContext = 'privatperson' | 'arbeidsgiver' | 'samarbeidspartner';
type DecoratorLanguage = 'en' | 'nb' | 'nn' | 'pl' | 'se';

export type DecoratorFragments = {
    HEADER: React.ReactNode;
    FOOTER: React.ReactNode;
    SCRIPTS: React.ReactNode;
    STYLES: React.ReactNode;
};

export type DecoratorParams = Partial<{
    availableLanguages: LanguageSelectorProps[];
    breadcrumbs: Breadcrumb[];
    chatbot: boolean;
    feedback: boolean;
    context: DecoratorContext;
    language: DecoratorLanguage;
}>;

const pathToLanguage: { [key in Language]: DecoratorLanguage } = {
    en: 'en',
    no: 'nb',
    pl: 'pl',
    se: 'se',
};

const pathToRoleContext: { [key: string]: DecoratorContext } = {
    person: 'privatperson',
    bedrift: 'arbeidsgiver',
    samarbeidspartner: 'samarbeidspartner',
};

const defaultParams: DecoratorParams = {
    chatbot: true,
};

const paramsFromContext = async (
    ctx: DocumentContext
): Promise<DecoratorParams> => {
    if (ctx.pathname === '/404') {
        return decoratorParams404;
    }

    const path = ctx.asPath;

    const [, languagePath, rolePath] = path.split('/');
    const language = pathToLanguage[languagePath];
    const roleContext = pathToRoleContext[rolePath];

    const xpPath = appPathToXpPath(path);
    const breadcrumbs = await fetchBreadcrumbs(xpPath);
    const languages = await fetchLanguages(xpPath);

    return {
        ...(breadcrumbs && { breadcrumbs }),
        ...(languages && { availableLanguages: languages }),
        ...(language && { language }),
        ...(roleContext && { context: roleContext }),
    };
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
            <script src={`${decoratorUrl}/client.js`}></script>
        </>
    ),
});

export const getDecorator = async (ctx: DocumentContext) => {
    const params = await paramsFromContext(ctx);
    const query = objectToQueryString({ ...defaultParams, ...params });

    const decoratorElementsFromCache = cache.get(query);

    if (decoratorElementsFromCache) {
        return decoratorElementsFromCache;
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
