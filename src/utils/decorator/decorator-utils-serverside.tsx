import React from 'react';
import {
    Components,
    Props,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { objectToQueryString } from '../fetch/fetch-utils';

const decoratorUrl = process.env.DECORATOR_FALLBACK_URL;
const decoratorLocalPort = process.env.DECORATOR_LOCAL_PORT || 8100;

type AppEnv = typeof process.env.ENV;
type DecoratorEnv = Props['env'];

const envMap: { [Key in AppEnv]: DecoratorEnv } = {
    localhost: 'localhost',
    dev1: 'dev',
    dev2: 'dev',
    prod: 'prod',
};

const decoratorEnv = envMap[process.env.ENV] || 'prod';

const fetchTimeoutMs = 15000;

// Client-side rendered decorator is used as a fallback if the server-side
// fetch fails
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
    params?: DecoratorParams,
    retries = 2
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
        if (retries > 0) {
            console.log(
                `Failed to fetch decorator, retrying ${retries} more times`
            );
            return getDecoratorComponents(params, retries - 1);
        }
        console.error(
            `Failed to fetch decorator with params ${JSON.stringify(
                params
            )} - ${e}`
        );
        return decoratorComponentsCSR(params);
    }
};
