import { ContentType, GlobalContentSchema } from './_schema';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
    metaDescription: string;
}>;

export interface TransportPageProps extends GlobalContentSchema {
    __typename: ContentType.TransportPage;
    data: TransportPageData;
}
