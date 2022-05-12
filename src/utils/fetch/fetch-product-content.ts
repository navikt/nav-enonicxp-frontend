import { fetchWithTimeout } from './fetch-utils';

export const fetchProductContent = async (id: string) => {
    const absoluteURL = `/api/internal/productDetails?id=${id}`;

    const response = await fetchWithTimeout(absoluteURL, 1500);
    if (!response) {
        return null;
    }
    const json = await response.json();

    return json;
};
