import {
    WebPage,
    Organization,
    ImageObject,
    Audience,
    Service,
    GovernmentOffice,
} from 'schema-dts';
import { ContentProps } from 'types/content-props/_content-common';

export type PageType = WebPage['@type'];

export type WithId<T> = T & { '@id': string; '@type': string };

// Note: needs better typing from schema-dts
export type OrgWithLogoRef = Organization & {
    '@type': string;
    logo?: { '@id': string };
    mainEntity?: string;
    mainEntityOfPage?: string;
};

export type Thing = WithId<
    WebPage | ImageObject | OrgWithLogoRef | Service | Audience | GovernmentOffice
>;

export type JsonLdData = {
    '@context': string | string[];
    '@graph': Thing[];
};

export type ReferenceConfig = {
    content: ContentProps;
    mainEntityOfPage?: string;
    mainEntity?: string;
};
