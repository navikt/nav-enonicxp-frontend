import { Lenkepanel } from 'types/lenkepanel';
import { ContentType, ContentCommonProps } from './_content-common';

export type TransportPageData = Partial<{
    ingress: string;
    items: Lenkepanel[];
}>;

export type TransportPageProps = ContentCommonProps & {
    type: ContentType.TransportPage;
    data: TransportPageData;
};
