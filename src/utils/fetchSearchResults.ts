import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { enonicDraftServicePath, enonicServicePath } from './paths';
import { SearchParams } from '../types/search/search-params';
import { SearchResultProps } from '../types/search/search-result';
import { SearchApiResponse } from '../pages/api/search';
import { NextRouter } from 'next/router';

const xpOrigin = process.env.XP_ORIGIN;
const xpServiceUrl = `${xpOrigin}${enonicServicePath}`;
const xpDraftServiceUrl = `${xpOrigin}${enonicDraftServicePath}`;

export const fetchSearchResults = (
    params?: SearchParams,
    draft = false
): Promise<SearchResultProps> => {
    const url = `${
        draft ? xpDraftServiceUrl : xpServiceUrl
    }/search${objectToQueryString(params)}`;
    return fetchWithTimeout(url, 5000).then((res) => {
        if (res.ok) {
            return res.json();
        }
        const error = `Failed to fetch search results: ${res.statusText}`;
        throw Error(error);
    });
};

export const fetchSearchResultsClientSide = async (
    searchParams: SearchParams,
    router: NextRouter
): Promise<SearchApiResponse> => {
    const queryString = objectToQueryString(searchParams);
    const { result, error } = (await fetch(
        `/api/search${queryString}`
    ).then((res) => res.json())) as SearchApiResponse;

    if (result) {
        const newUrl = `${window.location.href.split('?')[0]}${queryString}`;
        router.push(newUrl, undefined, {
            shallow: true,
        });
    }

    return { result, error };
};
