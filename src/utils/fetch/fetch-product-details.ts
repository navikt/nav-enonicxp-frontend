import { fetchJson } from './fetch-utils';
import { stripXpPathPrefix } from '../urls';

const origin = process.env.APP_ORIGIN;
const buildId = process.env.BUILD_ID;

export const fetchRelevantProductDetails = async (
    productDetailsPaths: string[]
) => {
    const productDetails = await Promise.all(
        productDetailsPaths.map((path) => {
            const jsonCacheUrl = `${origin}/_next/data/${buildId}${stripXpPathPrefix(
                path
            )}.json`;
            return fetchJson(jsonCacheUrl);
        })
    );

    const components = productDetails.map((item) => {
        return item.pageProps.content.page;
    });

    return components;
};
