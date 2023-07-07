import { globalValuesServiceFetch } from '../globalValuesServiceFetch';
import { GVMessageProps } from '../../components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceReorderItems = (
    orderedKeys: string[],
    contentId: string
) =>
    globalValuesServiceFetch<ServiceResponse>('reorder', {
        orderedKeys,
        contentId,
    });
