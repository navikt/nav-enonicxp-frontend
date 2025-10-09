import { WebPage, Organization, ImageObject } from 'schema-dts';

export type PageType = WebPage['@type'];

export type WithId<T extends { '@type': unknown }> = T & { '@id': string };

// Allow Organization.logo to be an @id reference
export type OrgWithLogoRef = Organization & {
    '@type': string;
    logo?: { '@id': string };
    mainEntity?: string;
};

export type GraphEntity = WithId<WebPage | ImageObject | OrgWithLogoRef>;

export type BaseJsonLd = {
    '@context': string | string[];
    '@graph': GraphEntity[];
};

export type JsonLdData = BaseJsonLd;
