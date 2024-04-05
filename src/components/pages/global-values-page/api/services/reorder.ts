import { globalValuesServiceFetch } from 'components/pages/global-values-page/api/globalValuesServiceFetch';
import { GVMessageProps } from 'components/pages/global-values-page/components/messages/GVMessages';

type ServiceResponse = GVMessageProps;

export const gvServiceReorderItems = (orderedKeys: string[], contentId: string) =>
    globalValuesServiceFetch<ServiceResponse>('reorder', {
        orderedKeys,
        contentId,
    });
