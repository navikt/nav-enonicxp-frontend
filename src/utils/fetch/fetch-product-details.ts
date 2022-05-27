import { ProductDetailType } from 'types/content-props/product-details';
import { fetchWithTimeout } from './fetch-utils';

const origin = process.env.APP_ORIGIN;
const buildId = process.env.BUILD_ID;

export const fetchRelevantProductDetails = async (path: string) => {
    const cachecURL = `${origin}/_next/data/${buildId}/utkast/${path}.json`;

    const response = await fetchWithTimeout(cachecURL);

    if (!response) {
        return null;
    }

    const json = await response.json();

    return json;
};
