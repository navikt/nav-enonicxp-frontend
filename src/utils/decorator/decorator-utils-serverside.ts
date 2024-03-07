import {
    DecoratorEnvProps,
    DecoratorFetchProps,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';

const { DECORATOR_URL } = process.env;

type AppEnv = typeof process.env.ENV;
type DecoratorEnv = DecoratorEnvProps['env'];

const envMap: Record<AppEnv, DecoratorEnv> = {
    localhost: 'localhost',
    dev1: 'dev',
    dev2: 'beta',
    prod: 'prod',
} as const;

const decoratorEnv = envMap[process.env.ENV] || 'prod';

const envProps: DecoratorFetchProps = {
    env: decoratorEnv,
    noCache: process.env.DECORATOR_NOCACHE === 'true',
    ...(decoratorEnv === 'localhost' && { localUrl: DECORATOR_URL }),
} as const;

export const getDecoratorComponents = async (params?: DecoratorParams) => {
    const decoratorComponents = fetchDecoratorReact({
        ...envProps,
        params,
    });

    return decoratorComponents;
};
