import { ContentType, ContentProps } from './_content-common';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    feedbackToggle: boolean;
}>;

export interface TransportPageProps extends ContentProps {
    __typename: ContentType.TransportPage;
    data: TransportPageData;
}
