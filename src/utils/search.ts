import { NotificationProps } from '../types/content-types/notification-props';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { enonicDraftServicePath, enonicServicePath } from './paths';
import { SearchParams } from '../types/search/search-params';

const xpOrigin = process.env.XP_ORIGIN;
const xpServiceUrl = `${xpOrigin}${enonicServicePath}`;
const xpDraftServiceUrl = `${xpOrigin}${enonicDraftServicePath}`;

export const fetchSearchResults = (
    params?: SearchParams,
    draft = false
): Promise<NotificationProps[]> => {
    const url = `${
        draft ? xpDraftServiceUrl : xpServiceUrl
    }/search${objectToQueryString(params)}`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch search results: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);
};
