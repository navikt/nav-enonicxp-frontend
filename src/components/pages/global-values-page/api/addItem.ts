import { fetchFromGlobalValuesService } from './fetchFromGlobalValuesService';
import { GlobalValueItem } from '../../../../types/content-props/global-values-props';

type ServiceResponse = {
    message: string;
};

export const gvServiceAddItem = (
    item: GlobalValueItem,
    contentId: string
): Promise<ServiceResponse | void> =>
    fetchFromGlobalValuesService<ServiceResponse>('addItem', {
        ...item,
        contentId,
    })
        .then((json) => {
            return json;
        })
        .catch((e) => {
            console.error(e);
        });
