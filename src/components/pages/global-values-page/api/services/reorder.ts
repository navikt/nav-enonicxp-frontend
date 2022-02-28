import { globalValuesServiceFetch } from '../globalValuesServiceFetch';
import { GVMessageProps } from '../../components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceReorderItems = (
    orderedKeys: string[],
    contentId: string
): Promise<ServiceResponse> =>
    globalValuesServiceFetch<ServiceResponse>('reorder', {
        orderedKeys,
        contentId,
    });
