import { globalValuesServiceFetch } from '../globalValuesServiceFetch';

type ContentInfo = {
    id: string;
    path: string;
    displayName: string;
};

type ServiceResponse = {
    usage: ContentInfo[];
    legacyUsage: ContentInfo[];
};

export const gvServiceGetUsage = (
    key: string,
    contentId: string
): Promise<ServiceResponse | null> =>
    globalValuesServiceFetch<ServiceResponse>('usage', {
        key,
        contentId,
    }).then((json) => {
        if (Array.isArray(json.usage)) {
            return json;
        }

        throw new Error(
            `Invalid response from key usage service for key ${key}`
        );
    });
