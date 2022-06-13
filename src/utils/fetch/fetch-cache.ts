import { fetchJson } from './fetch-utils';
import { stripXpPathPrefix } from '../urls';
import { CustomContentProps } from '../../types/content-props/_content-common';

const origin = process.env.APP_ORIGIN;
const buildId = process.env.BUILD_ID;

const urlPrefix = `${origin}/_next/data/${buildId}`;

type JsonCacheItem = {
    pageProps: {
        content: CustomContentProps;
    };
};

export const fetchPageCacheContent = async (
    path: string
): Promise<CustomContentProps | null> => {
    const jsonCacheUrl = `${urlPrefix}${stripXpPathPrefix(path)}.json`;

    return fetchJson<JsonCacheItem>(jsonCacheUrl).then((cacheItem) => {
        return cacheItem?.pageProps?.content || null;
    });
};
