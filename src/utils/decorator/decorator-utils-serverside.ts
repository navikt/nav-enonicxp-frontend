import {
    DecoratorEnvProps,
    DecoratorFetchProps,
    fetchDecoratorReact,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';

type AppEnv = typeof process.env.ENV;
type DecoratorEnv = DecoratorEnvProps['env'];

const envMap: Record<AppEnv, DecoratorEnv> = {
    localhost: 'localhost',
    dev1: 'dev',
    dev2: 'beta',
    prod: 'prodNext',
} as const;

const decoratorEnv = envMap[process.env.ENV || 'prod'] || 'prod';

const envProps: DecoratorFetchProps = {
    noCache: process.env.DECORATOR_NOCACHE === 'true',
    ...(decoratorEnv === 'localhost'
        ? { env: 'localhost', localUrl: process.env.DECORATOR_URL }
        : { env: decoratorEnv }),
} as const;

export const getDecoratorComponents = async (params?: DecoratorParams) => {
    const decoratorComponents = fetchDecoratorReact({
        ...envProps,
        params,
    });

    return decoratorComponents;
};
