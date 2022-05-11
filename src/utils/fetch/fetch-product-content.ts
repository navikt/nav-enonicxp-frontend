import { fetchWithTimeout } from './fetch-utils';

export const fetchProductContent = async (id: string) => {
    const absoluteURL = `/api/internal/productData?id=${id}`;

    const response = await fetchWithTimeout(absoluteURL, 1500);
    const json = await response.json();

    return json;
};
