import {
    fetchWithTimeout,
    objectToQueryString,
} from '../../../../utils/fetch-utils';
import { adminOrigin, xpServicePath } from '../../../../utils/urls';

const serviceUrl = `${adminOrigin}${xpServicePath}/globalValues`;

type GVRequestTypes = 'usage' | 'add' | 'modify' | 'remove' | 'getSet';

export const globalValuesServiceFetch = <ResponseType>(
    requestType: GVRequestTypes,
    params: object
): Promise<ResponseType> => {
    const query = objectToQueryString({ ...params });
    const url = `${serviceUrl}/${requestType}${query}`;
    console.log(url);

    return fetchWithTimeout(url, 5000).then((res) => {
        if (res.ok) {
            return res.json();
        }

        console.error(`Failed to fetch from ${url}`, res);
        throw new Error(`Failed to fetch from ${url}`);
    });
};
