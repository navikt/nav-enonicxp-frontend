import { globalValuesServiceFetch } from '../globalValuesServiceFetch';
import { GlobalValueItem } from '../../../../../types/content-props/global-values-props';

type ServiceResponse = {
    items: GlobalValueItem[];
};

export const gvServiceGetValueSet = (
    contentId: string
): Promise<ServiceResponse> =>
    globalValuesServiceFetch<ServiceResponse>('getValueSet', {
        contentId,
    })
        .then((json) => {
            return json;
        })
        .catch((e) => {
            console.error(e);
            return null;
        });
