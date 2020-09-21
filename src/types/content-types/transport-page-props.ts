import { ContentType, GlobalSchema } from './_schema';
import { LinkPanel } from '../link-panel';

export interface TransportPageProps extends GlobalSchema {
    __typename: ContentType.TransportPage;
    data: {
        ingress?: string;
        items?: LinkPanel[];
    };
}
