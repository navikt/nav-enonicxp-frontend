import { globalValuesServiceFetch } from '../globalValuesServiceFetch';

type ServiceResponse = {
    usage: string[];
};

export const gvServiceGetUsage = (
    key: string
): Promise<ServiceResponse | null> =>
    globalValuesServiceFetch<ServiceResponse>('usage', {
        key,
    })
        .then((json) => {
            if (Array.isArray(json.usage)) {
                return json;
            }

            throw new Error(
                `Invalid response from key usage service for key ${key}`
            );
        })
        .catch((e) => {
            console.error(e);
            return null;
        });
