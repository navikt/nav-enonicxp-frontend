import { globalValuesServiceFetch } from 'components/pages/global-values-page/api/globalValuesServiceFetch';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { GVMessageProps } from 'components/pages/global-values-page/components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceModifyItem = (item: GlobalValueItem, contentId: string) =>
    globalValuesServiceFetch<ServiceResponse>('modify', {
        ...item,
        contentId,
    });
