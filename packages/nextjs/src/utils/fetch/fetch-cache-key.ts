import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';

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
// Updated cache keys are provided in every invalidation request from revalidator-proxy. This function should only be
// used on newly spun up containers.
export const fetchAndSetCacheKey = async (retries = 5): Promise<void> => {
    if (!retries || retries < 0) {
        logger.error('Failed to fetch cache key from revalidator-proxy, no more retries remaining');
        return;
    }

    return fetchJson<GetCacheKeyResponse>(
        `${process.env.REVALIDATOR_PROXY_ORIGIN}/get-cache-key`,
        5000
    )
        .then((response) => {
            if (response?.key) {
                logger.info(`Setting cache key ${response.key}`, {
                    metaData: { cacheKey: response.key, timestamp: response.timestamp },
                });
                // @ts-ignore - Adding cacheKey to global namespace
                global.cacheKey = response.key;
                return;
            } else {
                throw new Error('Invalid response from revalidator proxy!');
            }
        })
        .catch((e) => {
            logger.error('Error while fetching cache key', {
                error: e,
                metaData: { retriesRemaining: retries },
            });
            return fetchAndSetCacheKey(retries - 1);
        });
};
