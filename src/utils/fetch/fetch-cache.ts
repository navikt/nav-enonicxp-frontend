import { fetchJson } from './fetch-utils';
import { stripXpPathPrefix } from '../urls';

const origin = process.env.APP_ORIGIN;
const buildId = process.env.BUILD_ID;

export const fetchJsonCache = async <ResponseType = any>(
    path: string
): Promise<ResponseType | null> => {
    const jsonCacheUrl = `${origin}/_next/data/${buildId}${stripXpPathPrefix(
        path
    )}.json`;

    return fetchJson<ResponseType>(jsonCacheUrl);
};
