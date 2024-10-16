import { fetchJson } from 'srcCommon/fetch-utils';

export type UrlSearchResponse = {
    url?: string;
    title?: string;
};

const searchUrl = process.env.NAVNO_SEARCH_API_URL;

export const fetchUrlSuggestion = (url: string) =>
    fetchJson<UrlSearchResponse>(encodeURI(`${searchUrl}?term=${url}`), 5000);
