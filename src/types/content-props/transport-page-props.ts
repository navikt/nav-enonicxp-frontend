import { ContentType, CustomContentCommonProps } from './_content-common';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
}>;

export interface TransportPageProps extends CustomContentCommonProps {
    __typename: ContentType.TransportPage;
    data: TransportPageData;
}
