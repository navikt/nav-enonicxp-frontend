import {
    fetchWithTimeout,
    objectToQueryString,
} from '../../../../utils/fetch/fetch-utils';
import { xpDraftPathPrefix, xpServicePath } from '../../../../utils/urls';

const serviceUrl = `${xpDraftPathPrefix}${xpServicePath}/globalValues`;

type GVRequestTypes =
    | 'usage'
    | 'add'
    | 'modify'
    | 'remove'
    | 'getValueSet'
    | 'reorder';

export const globalValuesServiceFetch = <ResponseType>(
    requestType: GVRequestTypes,
    params: object
): Promise<ResponseType> => {
    const query = objectToQueryString(params);
    const url = `${serviceUrl}/${requestType}${query}`;

    return fetchWithTimeout(url, 5000).then((res) => {
        return res.json();
    });
};
