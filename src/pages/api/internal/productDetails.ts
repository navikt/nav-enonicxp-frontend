import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchWithTimeout } from '../../../utils/fetch/fetch-utils';
import Cache from 'node-cache';
import { getNestedValueFromKeyString } from 'utils/objects';

// Misc config settings
// ----------------------------------------
const millisecondsToFetchTimeout = 60 * 1000; // 60 seconds timeout in ms.
const secondsToCacheExpiration = 60 * 10; // 10 minutes expiration.
const productListUrl = `${process.env.XP_ORIGIN}/_/service/no.nav.navno/productList`;
const productListServiceSecret = process.env.SERVICE_SECRET;
const cacheKey = 'productlist-cache';
const maxEntriesPerPage = 15;

const cache = new Cache({
    stdTTL: secondsToCacheExpiration,
    deleteOnExpire: false, // We still want to serve expired cache while a new fetch is being fetched in background.
});

const processResponse = async (response: Response) => {
    if (response.ok) {
        return await response.json();
    } else {
        throw Error(
            `Could not fetch productList from service. ${response.statusText}.`
        );
    }
};

const saveToCache = (json: any): void => {
    cache.set(cacheKey, json);
};

const fetchProductListAndUpdateCache = async (url: string) => {
    const fetchOptions: RequestInit = {
        headers: { secret: productListServiceSecret },
    };
    const response = await fetchWithTimeout(
        url,
        millisecondsToFetchTimeout,
        fetchOptions
    );

    const productList = await processResponse(response);
    saveToCache(JSON.stringify(productList));
    return productList;
};

const getSingleProductDetails = async (id): Promise<any> => {
    const allProducts = await getProductListFromCache();

    const foundProduct = allProducts.find((product) => product._id === id);

    if (!foundProduct) {
        return null;
    }

    return foundProduct;
};

const getProductListFromCache = async (): Promise<any> => {
    const currentTime = Date.now();
    const cacheExpires = cache.getTtl(cacheKey) || currentTime;
    const isCacheExpired = cacheExpires - currentTime <= 0;

    // There's nothing in the cache, so we're forced to await for the fetch to return.
    if (!cache.has(cacheKey)) {
        return await fetchProductListAndUpdateCache(productListUrl);
    }

    // Although the cache IS expired, we don't want to wait for the new 10-ish second fetch to return.
    // Therefore, initate a new fetch, but keep returning expired cache to avoid long response time.
    if (isCacheExpired) {
        fetchProductListAndUpdateCache(productListUrl);
    }

    const cachedProductList: string = await cache.get(cacheKey);
    let cachedJSON = {};

    try {
        cachedJSON = JSON.parse(cachedProductList);
    } catch (e) {
        console.log('Could not parse cached productList to json');
    }

    return cachedJSON;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const { id } = req.query;
    const product = await getSingleProductDetails(id);

    if (!product) {
        res.status(404);
        res.end();
    }

    res.setHeader('X-Robots-Tag', 'noindex');
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.json(product);
};

export default handler;
