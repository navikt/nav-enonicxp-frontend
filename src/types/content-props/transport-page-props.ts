import { ContentType, ContentCommonProps } from './_content-common';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
}>;

export type TransportPageProps = ContentCommonProps & {
    type: ContentType.TransportPage;
    data: TransportPageData;
};
