import Cache from 'node-cache';
import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';
import { apiErrorHandler } from 'utils/api-error-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

interface SitemapLanguageVersion {
    language: string;
    url: string;
}

interface SitemapEntity {
    url: string;
    modifiedTime: string;
    language: string;
    languageVersions?: SitemapLanguageVersion[];
}

// Misc config settings
// ----------------------------------------
const millisecondsToFetchTimeout = 60 * 1000; // 60 seconds timeout in ms.
const secondsToCacheExpiration = 60 * 10; // 10 minutes expiration.
const sitemapUrl = `${process.env.XP_ORIGIN}/_/service/no.nav.navno/sitemap`;
const sitemapServiceSecret = process.env.SERVICE_SECRET;
const cacheKey = 'sitemap-cache';

const fetchOptions: RequestInit = {
    headers: { secret: sitemapServiceSecret },
};

const cache = new Cache({
    stdTTL: secondsToCacheExpiration,
    deleteOnExpire: false, // We still want to serve expired cache while a new fetch is being fetched in background.
});

const escapeURL = (url: string) => {
    return url.replace(/&/g, '%26');
};

const buildLanguageAlternate = (languageVersions: SitemapLanguageVersion[]) => {
    let languageLink = '';
    languageVersions.forEach((version) => {
        languageLink = `${languageLink}<xhtml:link rel='alternate' hreflang='${
            version.language
        }' href='${escapeURL(version.url)}' />`;
    });

    return languageLink;
};

const buildUrlReference = (entity: SitemapEntity) => {
    const { url, modifiedTime, languageVersions = [] } = entity;
    const languageLinks = buildLanguageAlternate(languageVersions);
    return `<url><loc>${escapeURL(
        url
    )}</loc><lastmod>${modifiedTime}</lastmod>${languageLinks}</url>`;
};

const buildXMLSitemap = (jsonSitemap: SitemapEntity[]): string => {
    let xmlString =
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
    jsonSitemap.forEach((item) => {
        xmlString = `${xmlString}${buildUrlReference(item)}`;
    });
    xmlString = `${xmlString}</urlset>`;

    return xmlString;
};

const saveToCache = (xml: string): void => {
    cache.set(cacheKey, xml);
};

const fetchSitemapAndUpdateCache = async (url: string) => {
    const jsonSitemap = await fetchJson<SitemapEntity[]>(
        url,
        millisecondsToFetchTimeout,
        fetchOptions
    );
    if (!jsonSitemap) {
        logger.error('Error while fetching sitemap data');
        return null;
    }

    const xmlSitemap = buildXMLSitemap(jsonSitemap);
    saveToCache(xmlSitemap);
    return xmlSitemap;
};

const getSitemapFromCache = async () => {
    const currentTime = Date.now();
    const cacheExpires = cache.getTtl(cacheKey) || currentTime;
    const isCacheExpired = cacheExpires - currentTime <= 0;

    // There's nothing in the cache, so we're forced to await for the fetch to return.
    if (!cache.has(cacheKey)) {
        return await fetchSitemapAndUpdateCache(sitemapUrl);
    }

    // Although the cache IS expired, we don't want to wait for the new 10-ish second fetch to return.
    // Therefore, initate a new fetch, but keep returning expired cache to avoid long response time.
    if (isCacheExpired) {
        fetchSitemapAndUpdateCache(sitemapUrl);
    }

    return cache.get(cacheKey);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
    apiErrorHandler(req, res, async () => {
        const sitemapContent = await getSitemapFromCache();

        res.setHeader('X-Robots-Tag', 'noindex');

        if (!sitemapContent) {
            return res.status(503).send('Server error: sitemap is currently unavailable');
        }

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).end(sitemapContent);
    });

export default handler;
