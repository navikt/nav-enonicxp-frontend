import { globalValuesServiceFetch } from 'components/pages/global-values-page/api/globalValuesServiceFetch';
import { GlobalValueItem } from 'types/content-props/global-values-props';

type ServiceResponse = {
    items: GlobalValueItem[];
};

export const gvServiceGetValueSet = (contentId: string) =>
    globalValuesServiceFetch<ServiceResponse>('getValueSet', {
        contentId,
    });
