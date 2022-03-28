import React from 'react';
import {
    Components,
    Props,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { objectToQueryString } from './fetch/fetch-utils';

const decoratorUrl = process.env.DECORATOR_FALLBACK_URL;
const decoratorEnv = process.env.ENV as Props['env'];
const decoratorLocalPort = process.env.DECORATOR_LOCAL_PORT || 8100;
const fetchTimeoutMs = 15000;

const decoratorComponentsCSR = (params?: DecoratorParams): Components => {
    const query = objectToQueryString(params);

    return {
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
    };
};

export const getDecoratorComponents = async (
    params?: DecoratorParams
): Promise<Components> => {
    try {
        const decoratorComponents = await Promise.race([
            fetchDecoratorReact({
                env: decoratorEnv,
                port: decoratorLocalPort,
                ...params,
            }),
            new Promise((res, rej) =>
                setTimeout(() => rej('Fetch timeout'), fetchTimeoutMs)
            ),
        ]);

        return decoratorComponents as Components;
    } catch (e) {
        console.error(`Failed to fetch decorator - ${e}`);
        return decoratorComponentsCSR(params);
    }
};
