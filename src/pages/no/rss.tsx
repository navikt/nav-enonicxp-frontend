import { GetServerSideProps } from 'next';
import { fetchWithTimeout } from 'utils/fetch-utils';
import Cache from 'node-cache';

const oneHourInSeconds = 3600;
const oneMinuteInSeconds = 60;
const oneMinuteInMilliseconds = oneMinuteInSeconds * 1000;

const cacheKey = 'rss-cache';
const cache = new Cache({
    stdTTL: oneHourInSeconds,
    checkperiod: oneMinuteInSeconds,
});

const fetchRSS = (url) => {
    return fetchWithTimeout(url, oneMinuteInMilliseconds)
        .then(checkResponse)
        .then((xml) => xml.replace(/\/_\/legacy/g, ''))
        .then(saveToCache)
        .catch((e) => console.log(`Error fetching rss: ${e}`));
};

const checkResponse = (response: Response) => {
    if (response.ok) {
        const rss = response.text();
        cache.set(cacheKey, rss);
        return rss;
    } else {
        throw Error('Response not ok');
    }
};

const saveToCache = (xml) => {
    cache.set(cacheKey, xml);
    return xml;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const rssUrl = `${process.env.XP_ORIGIN}/_/legacy/no/rss`;
    const rssContent = cache.has(cacheKey)
        ? await cache.get(cacheKey)
        : await fetchRSS(rssUrl);

    res.setHeader('Content-Type', 'application/xml');
    res.end(rssContent);

    return { props: {} };
};

const RSS = () => null;

export default RSS;
