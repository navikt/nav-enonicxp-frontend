import { NextApiRequest, NextApiResponse } from 'next';
import LRUCache from 'lru-cache';
import { fetchJson } from '../../utils/fetch/fetch-utils';

const xpOrigin = process.env.XP_ORIGIN;

const cache = new LRUCache({
    max: 1000,
});

const validUrlPattern = new RegExp(/^\/_\/attachment\/inline\/.+\.json$/i);

const validateUrl = (
    fileUrl: NextApiRequest['query'][string]
): fileUrl is string =>
    typeof fileUrl === 'string' && validUrlPattern.test(fileUrl);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    const { url } = req.query;
    if (!validateUrl(url)) {
        console.log(`Invalid url specified for xp file cache - ${url}`);
        return res.status(400).send('A valid url parameter must be specified');
    }

    const cachedItem = cache.get(url);
    if (cachedItem) {
        res.setHeader('Cache-Control', 's-maxage=31536000');
        return res.status(200).json(cachedItem);
    }

    const fetchedItem = await fetchJson<string>(`${xpOrigin}${url}`).then(
        (response) => {
            if (!response) {
                return null;
            }

            // XP does not decode JSON file content
            try {
                return JSON.parse(response);
            } catch (e) {
                return response;
            }
        }
    );

    if (!fetchedItem) {
        console.log(`JSON file not found: ${url}`);
        return res.status(404).send('Not found');
    }

    cache.set(url, fetchedItem);

    res.setHeader('Cache-Control', 's-maxage=31536000');
    return res.status(200).json(fetchedItem);
};

export default handler;
