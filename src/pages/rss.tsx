import { GetServerSideProps } from 'next';
import { fetchWithTimeout } from 'utils/fetch-utils';
import Cache from 'node-cache';
import RSS from 'rss';

interface feedItem {
    title: string;
    url: string;
    pubDate?: string;
    description?: string;
}

// Misc config settings
// ----------------------------------------
const millisecondsToFetchTimeout = 60 * 1000; // 60 seconds timeout in ms.
const secondsToCacheExpiration = 60 * 10; // 10 minutes expiration.
const rssUrl = `${process.env.XP_ORIGIN}/_/service/no.nav.navno/rss`;
const rssServiceSecret = process.env.SERVICE_SECRET;
const cacheKey = 'rss-cache';

const cache = new Cache({
    stdTTL: secondsToCacheExpiration,
    deleteOnExpire: false, // We still want to serve expired cache while a new fetch is being fetched in background.
});

// TODO: Util function to use from rss and sitemap
const processResponse = async (response: Response) => {
    if (response.ok) {
        const rssFeed: feedItem[] = await response.json();
        return rssFeed;
    } else {
        console.error(
            `Error while fetching RSS data: ${response.status} - ${response.statusText}`
        );
        return null;
    }
};

const saveToCache = (xml: any): void => {
    cache.set(cacheKey, xml);
};

const fetchRSSFeedAndUpdateCache = async (url: string) => {
    const fetchOptions: RequestInit = {
        headers: { secret: rssServiceSecret },
    };
    const response = await fetchWithTimeout(
        url,
        millisecondsToFetchTimeout,
        fetchOptions
    );
    const jsonFeed = await processResponse(response);
    if (!jsonFeed) {
        return null;
    }
    const rssFeed = new RSS({
        title: 'Nyheter fra NAV',
        description: 'www.nav.no',
        feed_url: 'https://www.nav.no/no/rss',
        site_url: 'https://www.nav.no',
        language: 'no',
        pubDate: Date.now(),
    });
    jsonFeed.forEach((item: feedItem) => {
        rssFeed.item(item);
    });
    const xml = rssFeed.xml({ indent: true });
    saveToCache(xml);
    return xml;
};

const getRSSFeedFromCache = async () => {
    const currentTime = Date.now();
    const cacheExpires = cache.getTtl(cacheKey) || currentTime;
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

// Rewriting to an api-route causes the req/res objects to be empty when triggered by
// prefetching from the client, so we do it like this instead
export const rssFeedApi = async ({ res }) => {
    const rssFeed = await getRSSFeedFromCache();

    if (!rssFeed) {
        res.statusCode = 503;
        res.end('Server error: RSS-feed is currently unavailable');
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/xml');
        res.end(rssFeed);
    }

    return { props: {} };
};

export const getServerSideProps: GetServerSideProps = rssFeedApi;

const DummyComponent = () => null;

export default DummyComponent;
