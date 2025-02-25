import { NextApiRequest, NextApiResponse } from 'next';
import { LRUCache } from 'lru-cache';
import { fetchJson } from '@/shared/fetch-utils';
import { logger } from '@/shared/logger';

const xpOrigin = process.env.XP_ORIGIN;

const cache = new LRUCache({
    max: 1000,
});

const validUrlPattern = new RegExp(/^\/_\/attachment\/inline\/.+\.json$/i);

const validateUrl = (fileUrl: NextApiRequest['query'][string]): fileUrl is string =>
    typeof fileUrl === 'string' && validUrlPattern.test(fileUrl);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    const { url } = req.query;
    if (!validateUrl(url)) {
        logger.info(`Invalid url specified for xp file cache - ${url}`);
        return res.status(400).send('A valid url parameter must be specified');
    }

    const cachedItem = cache.get(url);
    if (cachedItem) {
        return res.status(200).send(cachedItem);
    }

    const fetchedItem = await fetchJson<string>(`${xpOrigin}${url}`).then((response) => {
        if (!response) {
            return null;
        }

        // XP does not decode JSON file content
        try {
            return JSON.parse(response);
        } catch (e) {
            return response;
        }
    });

    if (!fetchedItem) {
        logger.info(`JSON file not found: ${url}`);
        return res.status(404).send('Not found');
    }

    cache.set(url, fetchedItem);

    return res.status(200).send(fetchedItem);
};

export default handler;
