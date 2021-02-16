import { ContentType, ContentProps, SeoDataProps } from './_content-common';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
    feedbackToggle: boolean;
}> &
    SeoDataProps;

export interface TransportPageProps extends ContentProps {
    __typename: ContentType.TransportPage;
    data: TransportPageData;
}
