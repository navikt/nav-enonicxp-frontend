import { fetchJson } from '@/shared/fetch-utils';
import { stripXpPathPrefix } from 'utils/urls';
import { ContentProps } from 'types/content-props/_content-common';

const origin = process.env.APP_ORIGIN;
const buildId = process.env.BUILD_ID;

const urlPrefix = `${origin}/_next/data/${buildId}`;

type JsonCacheItem = {
    pageProps: {
        content: ContentProps;
    };
};

export const fetchPageCacheContent = async (path: string): Promise<ContentProps | null> => {
    if (!path) {
        return null;
    }

    const jsonCacheUrl = `${urlPrefix}${stripXpPathPrefix(path.split('#')[0])}.json`;

    return fetchJson<JsonCacheItem>(jsonCacheUrl, undefined, undefined, 2).then((cacheItem) => {
        return cacheItem?.pageProps?.content || null;
    });
};
