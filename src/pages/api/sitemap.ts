import { fetchWithTimeout } from 'utils/fetch-utils';
import Cache from 'node-cache';

const cacheKey = 'sitemap-cache';
const cache = new Cache({ stdTTL: 500, checkperiod: 100 });

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
    const sitemap = fetchWithTimeout(url, 25000)
        .then(checkResponse)
        .then((xml) => xml.replace(/\/_\/legacy/g, ''))
        .catch((e) => console.log(`Error fetching sitemap: ${e}`));

    if (sitemap) {
        cache.set(cacheKey, sitemap);
    }

    return sitemap;
};

const checkResponse = (response: Response) => {
    if (response.ok) {
        return response.text();
    } else {
        throw Error('Response not ok');
    }
};

export default handler;
