import { fetchJson, objectToQueryString } from '@/shared/fetch-utils';

export type UrlSearchResponse = {
    url?: string;
    title?: string;
};

const searchUrl = `${process.env.APP_ORIGIN}/sok/search-url`;

export const fetchUrlSuggestion = (url: string) =>
    fetchJson<UrlSearchResponse>(`${searchUrl}${objectToQueryString({ term: url })}`, 5000);
