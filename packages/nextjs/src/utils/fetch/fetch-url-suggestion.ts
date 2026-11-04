import { fetchJson } from '@/shared/fetch-utils';

export type UrlSearchResponse = {
    url?: string;
    title?: string;
};

const searchUrl = `${process.env.SEARCH_URL}/api/search-url`;

export const fetchUrlSuggestion = (url: string) =>
    fetchJson<UrlSearchResponse>(encodeURI(`${searchUrl}?term=${url}`), 5000);
