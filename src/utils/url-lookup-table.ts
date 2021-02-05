import { getUrlFromLookupTable } from '@navikt/nav-dekoratoren-moduler';
const { ENV } = process.env;

export const getEnvUrl = (path: string) =>
    ENV && ENV !== 'localhost' && ENV !== 'prod'
        ? getUrlFromLookupTable(path, ENV as 'dev' | 'q0' | 'q1' | 'q2' | 'q6')
        : path;
