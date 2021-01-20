import React from 'react';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { JSDOM } from 'jsdom';
import parse from 'html-react-parser';
import { Breadcrumb } from '../types/breadcrumb';
import { DocumentContext } from 'next/document';
import { decoratorParams404 } from '../components/pages/error-page/errorcode-content/Error404Content';
import { pathnameToXpPath, xpServiceUrl } from './paths';
import { Language } from '../translations';
import NodeCache from 'node-cache';
import { LanguageProps } from '../types/language';
import { getDecoratorLanguagesParam } from './languages';
import {
    DecoratorParams,
    pathToRoleContext,
    xpLangToDecoratorLang,
} from './decorator-utils';
import { ContentProps } from '../types/content-props/_content-common';

const decoratorUrl = process.env.DECORATOR_URL;

const cache = new NodeCache({ stdTTL: 60 });

export type DocumentProps = {
    decoratorFragments: DecoratorFragments;
    language: Language;
};

type DocumentParams = {
    decoratorParams: DecoratorParams;
    language: Language;
};

type DecoratorFragments = {
    HEADER: React.ReactNode;
    FOOTER: React.ReactNode;
    SCRIPTS: React.ReactNode;
    STYLES: React.ReactNode;
};

const decoratorParamsDefault = {
    chatbot: true,
};

const decodeAndStripQueryFromPath = (path: string) =>
    decodeURI(path).split('?')[0];

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

const getDecoratorParamsFromContent = async (
    content: ContentProps,
    path: string
): Promise<DocumentParams> => {
    if (ctx.pathname === '/404') {
        return { decoratorParams: decoratorParams404, language: 'no' };
    }

    const rolePath = path.split('/')[2];
    const context = pathToRoleContext[rolePath];

    const props = await fetchDecoratorProps(pathnameToXpPath(path));

    if (!props) {
        return { decoratorParams: decoratorParamsDefault, language: 'no' };
    }

    const { currentLanguage, languages, breadcrumbs } = props;

    const availableLanguages = getDecoratorLanguagesParam(
        languages,
        currentLanguage,
        path
    );

    return {
        decoratorParams: {
            ...(breadcrumbs && {
                breadcrumbs: breadcrumbs.map((crumb) => ({
                    handleInApp: true,
                    ...crumb,
                })),
            }),
            ...(availableLanguages && { availableLanguages }),
            ...(context && { context }),
            language: xpLangToDecoratorLang[currentLanguage] || 'nb',
        },
        language: currentLanguage,
    };
};

const getDecoratorFragments = async (
    decoratorParams: DecoratorParams
): Promise<DecoratorFragments> => {
    const query = objectToQueryString({
        ...decoratorParamsDefault,
        ...decoratorParams,
    });

    const decoratorHtml = await fetchDecorator(query);

    // Fallback to client-side rendered decorator if fetch failed
    if (!decoratorHtml) {
        return {
            HEADER: <div id="decorator-header"></div>,
            STYLES: (
                <link
                    href={`${decoratorUrl}/css/client.css`}
                    rel="stylesheet"
                />
            ),
            FOOTER: <div id="decorator-footer"></div>,
            SCRIPTS: (
                <>
                    <div
                        id="decorator-env"
                        data-src={`${decoratorUrl}/env${query}`}
                    ></div>
                    <script
                        async={true}
                        src={`${decoratorUrl}/client.js`}
                    ></script>
                </>
            ),
        };
    }

    const { document } = new JSDOM(decoratorHtml).window;

    return {
        HEADER: parse(document.getElementById('header-withmenu').innerHTML),
        STYLES: parse(document.getElementById('styles').innerHTML),
        FOOTER: parse(document.getElementById('footer-withmenu').innerHTML),
        SCRIPTS: parse(document.getElementById('scripts').innerHTML),
    };
};

export const getDocumentProps = async (
    ctx: DocumentContext
): Promise<DocumentProps> => {
    const path = decodeAndStripQueryFromPath(ctx.asPath);
    if (cache.has(path)) {
        return cache.get(path);
    }

    const { decoratorParams, language } = await getDecoratorParamsFromContent(
        ctx,
        path
    );
    const documentProps = {
        decoratorFragments: await getDecoratorFragments(decoratorParams),
        language,
    };

    cache.set(path, documentProps);

    return documentProps;
};
