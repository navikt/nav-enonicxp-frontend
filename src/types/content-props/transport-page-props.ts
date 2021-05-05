import {
    ContentType,
    ContentProps,
    SeoDataProps,
    ContentDecoratorToggles,
} from './_content-common';
import { LinkPanel } from '../link-panel';

export type TransportPageData = Partial<{
    ingress: string;
    items: LinkPanel[];
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export interface TransportPageProps extends ContentProps {
    __typename: ContentType.TransportPage;
    data: TransportPageData;
}
