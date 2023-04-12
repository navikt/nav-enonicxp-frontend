import React from 'react';
import {
    DecoratorEnvProps,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

const { DECORATOR_URL } = process.env;

type AppEnv = typeof process.env.ENV;
type DecoratorEnv = DecoratorEnvProps['env'];

const envMap: { [Key in AppEnv]: DecoratorEnv } = {
    localhost: 'localhost',
    dev1: 'dev',
    dev2: 'beta',
    prod: 'prod',
};

const decoratorEnv = envMap[process.env.ENV] || 'prod';

const envProps =
    decoratorEnv === 'localhost'
        ? {
              env: decoratorEnv,
              localUrl: DECORATOR_URL,
          }
        : {
              env: decoratorEnv,
              // Service discovery only works when running on k8s
              // Do not use during CI build
              serviceDiscovery:
                  process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD,
          };

export const getDecoratorComponents = async (params?: DecoratorParams) => {
    const decoratorComponents = fetchDecoratorReact({ ...envProps, params });

    return decoratorComponents;
};
