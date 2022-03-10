import { fetchJson } from './fetch-utils';

type GetCacheKeyResponse = {
    key: string;
    timestamp: number;
};

// Get the latest cache-version key from revalidator-proxy, which regenerates this key every time new
// content is published
// This is used for prefixing the cache-keys in the backend, and ensures stale cache is not used after new
// content has been published
//
// If this call should fail for whatever reason, no cache key will be set, which results in content being retrieved
// fresh from the backend with no cache. This is typically not a problem in and of itself, but can result in a large
// spike in server-load on the backend when a new frontend-instance with a cold cache is spun up.
//
// Updated cache keys are provided in every invalidation request from revalidator-proxy. This functino should only be
// used on newly spun up containers.
export const fetchAndSetCacheKey = async (retries = 5): Promise<boolean> => {
    if (!retries || retries < 0) {
        console.error(
            'Failed to fetch cache key from revalidator-proxy, no more retries remaining'
        );
        return true;
    }

    fetchJson<GetCacheKeyResponse>(
        `${process.env.REVALIDATOR_PROXY_ORIGIN}/get-cache-key`,
        5000
    )
        .then((response) => {
            if (response?.key) {
                console.log(
                    `Cache key response: ${response.key}, ${response.timestamp}`
                );
                global.cacheKey = response.key;
                return true;
            } else {
                throw new Error('Invalid response from revalidator proxy!');
            }
        })
        .catch((e) => {
            console.error(
                `Error while fetching cache key, ${retries} retries remaining - ${e}`
            );
            return fetchAndSetCacheKey(retries - 1);
        });
};
