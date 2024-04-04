import { fetchJson } from 'srcCommon/fetch-utils';

type UrlSearchResponse = {
    suggestion?: string;
};

const searchUrl = process.env.NAVNO_SEARCH_API_URL;

export const fetchUrlSuggestion = (url: string) =>
    fetchJson<UrlSearchResponse>(
        encodeURI(`${searchUrl}?term=${url}`),
        5000
    ).then((res) => {
        return res;
    });
