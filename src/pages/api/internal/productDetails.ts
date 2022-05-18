import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchWithTimeout } from '../../../utils/fetch/fetch-utils';
import Cache from 'node-cache';
import { getDeepObjectKey } from 'utils/objects';
import { ProductDetailType } from 'types/content-props/product-details';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';

// Misc config settings
// ----------------------------------------
const millisecondsToFetchTimeout = 60 * 1000; // 60 seconds timeout in ms.
const secondsToCacheExpiration = 60 * 10; // 10 minutes expiration.
const productDetailsUrl = `${process.env.XP_ORIGIN}/_/service/no.nav.navno/productDetails`;
const productDetailsServiceSecret = process.env.SERVICE_SECRET;
const cachePrefix = 'product-details-';

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

const saveToCache = (key: string, json: any): void => {
    const stringifiedJSON = JSON.stringify(json);

    cache.set(key, stringifiedJSON);
};

const getFromCache = async (cacheKey: string) => {
    const stringifiedResult: string = await cache.get(cacheKey);

    let result = null;

    try {
        result = JSON.parse(stringifiedResult);
    } catch (e) {
        console.log('Could not parse cached productList to json');
    }

    return result;
};

const fetchProductDetailsAndUpdateCache = async (productId: string) => {
    const fetchOptions: RequestInit = {
        headers: { secret: productDetailsServiceSecret },
    };
    const response = await fetchWithTimeout(
        `${productDetailsUrl}?productId=${productId}`,
        millisecondsToFetchTimeout,
        fetchOptions
    );

    const details = await processResponse(response);
    const cacheKey = `${cachePrefix}${productId}`;

    saveToCache(cacheKey, details);

    return details;
};

const getProductDetailsFromCache = async (
    productId: string
): Promise<ProductDetailsProps[]> => {
    const currentTime = Date.now();
    const cacheKey = `${cachePrefix}${productId}`;
    const cacheExpires = cache.getTtl(cacheKey) || currentTime;
    const isCacheExpired = cacheExpires - currentTime <= 0;

    // There's nothing in the cache, so we're forced to await for the fetch to return.
    if (!cache.has(cacheKey)) {
        console.log(`${cacheKey} not in cache`);
        return await fetchProductDetailsAndUpdateCache(productId);
    }

    // Although the cache IS expired, we don't want to wait for the new 10-ish second fetch to return.
    // Therefore, initate a new fetch, but keep returning expired cache to avoid long response time.
    if (isCacheExpired) {
        console.log('cache expired');
        fetchProductDetailsAndUpdateCache(productId);
    }

    return await getFromCache(cacheKey);
};

const getProductDetails = async (
    productId: string,
    detailType: ProductDetailType
): Promise<any> => {
    const productDetails = await getProductDetailsFromCache(productId);

    if (!productDetails) {
        return [];
    }

    return productDetails
        .filter((detail) => detail.data.detailType === detailType)
        .map((detail) => {
            return detail?.page?.regions;
        });
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const { id, type } = req.query;
    if (!id || !type) {
        res.status(404);
        res.end();
    }

    const normalizedId = id.toString();
    const normalizedType = type.toString() as ProductDetailType;

    const productDetails = await getProductDetails(
        normalizedId,
        normalizedType
    );

    if (!productDetails) {
        res.status(404);
        res.end();
    }

    res.setHeader('X-Robots-Tag', 'noindex');
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.json(productDetails);
};

export default handler;
