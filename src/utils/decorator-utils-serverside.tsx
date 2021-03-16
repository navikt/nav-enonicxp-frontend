import React from 'react';
import {
    Components,
    Props,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { DecoratorParams } from './decorator-utils';
import { objectToQueryString } from './fetch-utils';

const decoratorUrl = process.env.DECORATOR_URL;
const decoratorEnv = process.env.ENV as Props['env'];
const decoratorLocalPort = process.env.DECORATOR_LOCAL_PORT || 8100;

const decoratorComponentsCSR = (query?: string): Components => ({
    Header: () => <div id="decorator-header"></div>,
    Styles: () => (
        <link href={`${decoratorUrl}/css/client.css`} rel="stylesheet" />
    ),
    Footer: () => <div id="decorator-footer"></div>,
    Scripts: () => (
        <>
            <div
                id="decorator-env"
                data-src={`${decoratorUrl}/env${query || ''}`}
            ></div>
            <script async={true} src={`${decoratorUrl}/client.js`}></script>
        </>
    ),
});

export const getDecoratorComponents = async (
    params?: DecoratorParams
): Promise<Components> => {
    const decoratorComponents = await fetchDecoratorReact({
        env: decoratorEnv,
        port: decoratorLocalPort,
        ...params,
    });

    // Fallback to client-side rendered decorator components if fetch failed
    if (!decoratorComponents) {
        return decoratorComponentsCSR(objectToQueryString(params));
    }

    return decoratorComponents;
};
