import { fetchJson } from '../../../utils/fetch-utils';

type GetCacheKeyResponse = {
    key: string;
    timestamp: number;
};

const fetchAndSetCacheKey = () => {
    fetchJson<GetCacheKeyResponse>(
        `${process.env.REVALIDATOR_PROXY_ORIGIN}/get-cache-key`
    ).then((response) => {
        if (response) {
            console.log(
                `Cache key response: ${response.key}, ${response.timestamp}`
            );
            global.cacheKey = response.key;
        } else {
            console.error('No response from revalidator proxy!');
        }
    });
};

const isReady = (req, res) => {
    if (global.cacheKey) {
        return res.status(200).json({ message: 'Ok!' });
    } else {
        fetchAndSetCacheKey();
        return res.status(503).json({ message: 'Not ready' });
    }
};

export default isReady;
