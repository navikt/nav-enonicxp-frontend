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

// Content Studio has no access directly to ansatt-ingress, so switch to
// ekstern-ingress and add noRedirect to avoid backlash to ansatt.
const adjustForPreviewMode = (url: string): string => {
    if (window.location.host.includes('oera.no')) {
        return `${url.replace('ansatt', 'ekstern')}?noRedirect=true`;
    }
    return url;
};

export const fetchPageCacheContent = async (path: string): Promise<ContentProps | null> => {
    if (!path) {
        return null;
    }

    const jsonCacheUrl = `${urlPrefix}${stripXpPathPrefix(path.split('#')[0])}.json`;

    const adjustedUrl = adjustForPreviewMode(jsonCacheUrl);

    return fetchJson<JsonCacheItem>(adjustedUrl, undefined, undefined, 2).then((cacheItem) => {
        return cacheItem?.pageProps?.content || null;
    });
};
