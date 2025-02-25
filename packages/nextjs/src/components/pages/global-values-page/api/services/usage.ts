import { globalValuesServiceFetch } from 'components/pages/global-values-page/api/globalValuesServiceFetch';

export type UsageContentInfo = {
    id: string;
    path: string;
    displayName: string;
};

type ServiceResponse = {
    usage: UsageContentInfo[];
};

export const gvServiceGetUsage = (key: string, contentId: string) =>
    globalValuesServiceFetch<ServiceResponse>('usage', {
        key,
        contentId,
    }).then((res) => {
        if (Array.isArray(res?.usage)) {
            return res;
        }

        return null;
    });
