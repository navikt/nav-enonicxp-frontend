import { NextApiRequest, NextApiResponse } from 'next';
import Cache from 'node-cache';
import RSS from 'rss';
import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import { apiErrorHandler } from 'utils/api-error-handler';

type FeedItem = {
    title: string;
    url: string;
    date: string;
    description: string;
};

// Misc config settings
// ----------------------------------------
const millisecondsToFetchTimeout = 60 * 1000; // 60 seconds timeout in ms.
const secondsToCacheExpiration = 60 * 10; // 10 minutes expiration.
const rssUrl = `${process.env.XP_ORIGIN}/_/service/no.nav.navno/rss`;
const rssServiceSecret = process.env.SERVICE_SECRET;
const cacheKey = 'rss-cache';

const fetchOptions: RequestInit = {
    headers: { secret: rssServiceSecret },
};

const cache = new Cache({
    stdTTL: secondsToCacheExpiration,
    deleteOnExpire: false, // We still want to serve expired cache while a new fetch is being fetched in background.
});

const saveToCache = (xml: string): void => {
    cache.set(cacheKey, xml);
};

const fetchRSSFeedAndUpdateCache = async (url: string) => {
    const jsonFeed = await fetchJson<FeedItem[]>(url, millisecondsToFetchTimeout, fetchOptions);
    if (!jsonFeed) {
        logger.error('Error while fetching RSS data');
        return null;
    }
    const rssFeed = new RSS({
        title: 'Nyheter fra Nav',
        description: 'www.nav.no',
        feed_url: 'https://www.nav.no/no/rss',
        site_url: 'https://www.nav.no',
        language: 'no',
        pubDate: Date.now().toString(),
    });
    jsonFeed.forEach((item) => {
        rssFeed.item(item);
    });
    const xml = rssFeed.xml({ indent: true });
    saveToCache(xml);
    return xml;
};

const getRSSFeedFromCache = async () => {
    const currentTime = Date.now();
    const cacheExpires = cache.getTtl(cacheKey) ?? currentTime;
    const isCacheExpired = cacheExpires - currentTime <= 0;

    // There's nothing in the cache, so we're forced to await for the fetch to return.
    if (!cache.has(cacheKey)) {
        return await fetchRSSFeedAndUpdateCache(rssUrl);
    }

    // Although the cache IS expired, we don't want to wait for the new 10-ish second fetch to return.
    // Therefore, initate a new fetch, but keep returning expired cache to avoid long response time.
    if (isCacheExpired) {
        fetchRSSFeedAndUpdateCache(rssUrl);
    }

    return cache.get(cacheKey);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
    apiErrorHandler(req, res, async () => {
        const rssFeed = await getRSSFeedFromCache();

        if (!rssFeed) {
            return res.status(503).send('Server error: RSS-feed is currently unavailable');
        }

        res.setHeader('Content-Type', 'application/xml');
        return res.status(200).end(rssFeed);
    });

export default handler;
