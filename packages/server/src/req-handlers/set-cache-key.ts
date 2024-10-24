import { RequestHandler } from 'express';
import { logger } from '@/shared/logger';

let currentCacheTimestamp = 0;

export const setCacheKey: RequestHandler = (req, res, next) => {
    const { cache_key, cache_ts } = req.headers;

    if (typeof cache_key === 'string') {
        const newCacheTimestamp = Number(cache_ts);
        if (newCacheTimestamp > currentCacheTimestamp) {
            logger.info(`Setting new cache key ${cache_key} with timestamp ${cache_ts}`);
            global.cacheKey = cache_key;
            currentCacheTimestamp = newCacheTimestamp;
        } else {
            logger.info(
                `Rejecting cache key ${cache_key} with timestamp ${newCacheTimestamp} - current cache key ${global.cacheKey} is same or newer (${currentCacheTimestamp})`
            );
        }
    } else {
        logger.error(`No valid cache key provided - ${cache_key}`);
    }

    next();
};
