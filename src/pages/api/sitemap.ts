import { fetchWithTimeout } from 'utils/fetch-utils';
import Cache from 'node-cache';

const oneHourInSeconds = 3600;
const oneMinuteInSeconds = 60;

const cacheKey = 'sitemap-cache';
const cache = new Cache({
    stdTTL: oneHourInSeconds,
    checkperiod: oneMinuteInSeconds,
});

const handler = async (req, res) => {
    const sitemapUrl = `${process.env.XP_ORIGIN}/_/legacy/sitemap.xml`;
    const sitemapContent = cache.has(cacheKey)
        ? await cache.get(cacheKey)
        : await fetchSitemap(sitemapUrl);

    res.setHeader('Content-Type', 'application/xml');
    res.status(200);
    res.end(sitemapContent);
};

const fetchSitemap = (url) => {
    return fetchWithTimeout(url, 50000)
        .then(checkResponse)
        .then((xml) => xml.replace(/\/_\/legacy/g, ''))
        .then(saveToCache)
        .catch((e) => console.log(`Error fetching sitemap: ${e}`));
};

const checkResponse = (response: Response) => {
    if (response.ok) {
        const sitemap = response.text();
        cache.set(cacheKey, sitemap);
        return sitemap;
    } else {
        throw Error('Response not ok');
    }
};

const saveToCache = (xml) => {
    cache.set(cacheKey, xml);
    return xml;
};

export default handler;
