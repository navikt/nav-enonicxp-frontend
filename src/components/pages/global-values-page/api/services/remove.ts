import { globalValuesServiceFetch } from '../globalValuesServiceFetch';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { GVMessageProps } from '../../components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceRemoveItem = (item: GlobalValueItem, contentId: string) =>
    globalValuesServiceFetch<ServiceResponse>('remove', {
        key: item.key,
        contentId,
    });
