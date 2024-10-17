import { xpDraftPathPrefix, xpServicePath } from '@nav-enonicxp-frontend/nextjs/src/utils/urls';
import { fetchJson, objectToQueryString } from '@/common/fetch-utils';

const SERVICE_URL = `${xpDraftPathPrefix}${xpServicePath}/globalValues`;

type GVRequestTypes = 'usage' | 'add' | 'modify' | 'remove' | 'getValueSet' | 'reorder';

export const globalValuesServiceFetch = <ResponseType>(
    requestType: GVRequestTypes,
    params: object
) => {
    const query = objectToQueryString(params);
    const url = `${SERVICE_URL}/${requestType}${query}`;

    return fetchJson<ResponseType>(url, 5000);
};
