import { fetchFromGlobalValuesService } from './fetchFromGlobalValuesService';

type ServiceResponse = {
    uses: string[];
};

export const gvServiceGetKeyUsage = (
    key: string
): Promise<ServiceResponse | null> =>
    fetchFromGlobalValuesService<ServiceResponse>('getKeyUsage', {
        key,
    })
        .then((json) => {
            if (Array.isArray(json.uses)) {
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
