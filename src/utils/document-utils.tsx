import React from 'react';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import { Breadcrumb } from '../types/breadcrumb';
import { LanguageSelectorProps } from '../types/language-selector-props';
import { DocumentContext } from 'next/document';
import { decoratorParams404 } from '../components/pages/error-page/errorcode-content/Error404Content';
import { appPathToXpPath } from './paths';
import { fetchBreadcrumbs, fetchLanguageProps } from './fetch-content';
import { Language } from '../translations';

const decoratorUrl = process.env.DECORATOR_URL;

type DecoratorContext = 'privatperson' | 'arbeidsgiver' | 'samarbeidspartner';
type DecoratorLanguage = 'en' | 'nb' | 'nn' | 'pl' | 'se';

export type DecoratorFragments = {
    HEADER: React.ReactNode;
    FOOTER: React.ReactNode;
    SCRIPTS: React.ReactNode;
    STYLES: React.ReactNode;
};

const decoratorParamsDefault: DecoratorParams = {
    chatbot: true,
};

export type DecoratorParams = Partial<{
    availableLanguages: LanguageSelectorProps[];
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

export const xpLangToDecoratorLang: { [key in Language]: DecoratorLanguage } = {
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

export const paramsFromContext = async (
    ctx: DocumentContext
): Promise<DocumentParams> => {
    if (ctx.pathname === '/404') {
        return { decoratorParams: decoratorParams404, language: 'no' };
    }

    const path = ctx.asPath;

    const rolePath = path.split('/')[2];
    const roleContext = pathToRoleContext[rolePath];

    const xpPath = appPathToXpPath(path);
    const breadcrumbs = await fetchBreadcrumbs(xpPath);
    const { currentLanguage, languages } = await fetchLanguageProps(xpPath);
    const decoratorLang = xpLangToDecoratorLang[currentLanguage] || 'nb';

    return {
        decoratorParams: {
            ...(breadcrumbs && { breadcrumbs }),
            ...(languages && { availableLanguages: languages }),
            ...(roleContext && { context: roleContext }),
            language: decoratorLang,
        },
        language: currentLanguage,
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

export const getDecorator = async (params: DecoratorParams) => {
    const query = objectToQueryString({ ...decoratorParamsDefault, ...params });

    const decoratorHtml = await fetchDecorator(query);

    // Fallback to client-side rendered decorator if fetch failed
    if (!decoratorHtml) {
        return decoratorCSR(query);
    }

    const { document } = new JSDOM(decoratorHtml).window;

    return {
        HEADER: parse(document.getElementById('header-withmenu').innerHTML),
        STYLES: parse(document.getElementById('styles').innerHTML),
        FOOTER: parse(document.getElementById('footer-withmenu').innerHTML),
        SCRIPTS: parse(document.getElementById('scripts').innerHTML),
    };
};
