import { globalValuesServiceFetch } from '../globalValuesServiceFetch';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { GVMessageProps } from '../../components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceModifyItem = (item: GlobalValueItem, contentId: string) =>
    globalValuesServiceFetch<ServiceResponse>('modify', {
        ...item,
        contentId,
    });
