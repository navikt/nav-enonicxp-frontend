import { globalValuesServiceFetch } from '../globalValuesServiceFetch';
import { GVMessageProps } from '../../components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceReorderItems = (
    keys: string[],
    contentId: string
): Promise<ServiceResponse> =>
    globalValuesServiceFetch<ServiceResponse>('reorder', {
        keys,
        contentId,
    });
