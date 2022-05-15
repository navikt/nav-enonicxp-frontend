import { ProductDetailType } from 'types/content-props/product-details';
import { fetchWithTimeout } from './fetch-utils';

export const fetchRelevantProductDetails = async (
    id: string,
    type: ProductDetailType
) => {
    const absoluteURL = `/api/internal/productDetails?id=${id}&type=${type}`;

    const response = await fetchWithTimeout(absoluteURL, 1500);
    if (!response) {
        return null;
    }
    const json = await response.json();

    return json;
};
