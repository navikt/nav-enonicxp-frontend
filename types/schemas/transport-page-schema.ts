import { ContentType, GlobalSchema } from './_schemas';
import { LinkPanel } from '../linkpanel';

export interface TransportPageSchema extends GlobalSchema {
    type: ContentType.TransportPage;
    data: {
        title?: string;
        ingress?: string;
        items?: LinkPanel[];
    };
}
