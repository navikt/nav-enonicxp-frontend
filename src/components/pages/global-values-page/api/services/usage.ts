import { globalValuesServiceFetch } from '../globalValuesServiceFetch';

type ContentInfo = {
    id: string;
    path: string;
    displayName: string;
};

type ServiceResponse = {
    usage: ContentInfo[];
};

export const gvServiceGetUsage = (
    key: string
): Promise<ServiceResponse['usage'] | null> =>
    globalValuesServiceFetch<ServiceResponse>('usage', {
        key,
    })
        .then((json) => {
            if (Array.isArray(json.usage)) {
                return json.usage;
            }

            throw new Error(
                `Invalid response from key usage service for key ${key}`
            );
        })
        .catch((e) => {
            console.error(e);
            return null;
        });
