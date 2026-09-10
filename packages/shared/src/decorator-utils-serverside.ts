import {
    fetchDecoratorReact,
    DecoratorEnvProps,
    DecoratorFetchProps,
    DecoratorParams,
} from '@navikt/nav-dekoratoren-moduler/ssr';

type AppEnv = typeof process.env.ENV;
type DecoratorEnv = DecoratorEnvProps['env'];

// The decorator-moduler package only knows about these 4 shared nais
// environments - each resolves to a fixed, hardcoded decorator URL owned by
// the decorator team. Environments with their own dedicated decorator
// instance (localhost, dev3) aren't part of this and must be handled
// separately via DECORATOR_URL below.
const sharedEnvMap: Partial<Record<AppEnv, DecoratorEnv>> = {
    dev1: 'dev',
    dev2: 'beta',
    prod: 'prod',
    dev3: 'dev3',
};

// dev3 runs its own dedicated decorator instance (nav-dekoratoren-dev3)
// rather than sharing one of the environments above, so we point directly
// at its URL the same way we do for local development.
const usesCustomDecoratorUrl = process.env.ENV === 'localhost' || process.env.ENV === 'dev3';

export const decoratorEnvProps: DecoratorFetchProps = {
    noCache: process.env.DECORATOR_NOCACHE === 'true',
    ...(usesCustomDecoratorUrl
        ? { env: 'localhost', localUrl: process.env.DECORATOR_URL }
        : { env: sharedEnvMap[process.env.ENV] || 'prod' }),
} as const;

export const getDecoratorComponents = async (params?: DecoratorParams) => {
    const decoratorComponents = fetchDecoratorReact({
        ...decoratorEnvProps,
        params,
    });

    return decoratorComponents;
};
