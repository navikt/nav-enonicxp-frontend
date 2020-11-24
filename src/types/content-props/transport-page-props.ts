import { ContentType, GlobalContentProps } from './_content-common';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
    metaDescription: string;
}>;

export interface TransportPageProps extends GlobalContentProps {
    __typename: ContentType.TransportPage;
    data: TransportPageData;
}
