import { ContentType, GlobalPageSchema } from './_schema';
import { LinkPanel } from '../link-panel';

export interface TransportPageProps extends GlobalPageSchema {
    __typename: ContentType.TransportPage;
    data: {
        ingress?: string;
        items?: LinkPanel[];
    };
}
