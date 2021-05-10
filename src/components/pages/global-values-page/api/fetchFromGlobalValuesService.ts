import {
    fetchWithTimeout,
    objectToQueryString,
} from '../../../../utils/fetch-utils';
import { adminOrigin, xpServicePath } from '../../../../utils/urls';

const serviceUrl = `${adminOrigin}${xpServicePath}/globalValues`;

type GVRequestTypes = 'selector' | 'getKeyUsage' | 'addItem' | 'modifyItem';

export const fetchFromGlobalValuesService = <ResponseType>(
    requestType: GVRequestTypes,
    params: object
): Promise<ResponseType> => {
    const query = objectToQueryString({ ...params, type: requestType });
    const url = `${serviceUrl}${query}`;
    console.log(url);

    return fetchWithTimeout(url, 5000).then((res) => {
        if (res.ok) {
            return res.json();
        }

        console.error(`Failed to fetch from ${url}`, res);
        throw new Error(`Failed to fetch from ${url}`);
    });
};
