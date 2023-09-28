import { fetchJson, objectToQueryString } from 'utils/fetch/fetch-utils';
import { xpServicePath } from 'utils/urls';
import { xpPreviewBasePathDefault } from 'components/_editor-only/utils/editor-urls';

const SERVICE_URL = `${xpPreviewBasePathDefault}${xpServicePath}/globalValues`;

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
) => {
    const query = objectToQueryString(params);
    const url = `${SERVICE_URL}/${requestType}${query}`;

    return fetchJson<ResponseType>(url, 5000);
};
