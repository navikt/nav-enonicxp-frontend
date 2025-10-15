import { WebPage, Organization, ImageObject } from 'schema-dts';

export type PageType = WebPage['@type'];

export type WithId<T extends { '@type': unknown }> = T & { '@id': string };

// Note: needs better typing from schema-dts
export type OrgWithLogoRef = Organization & {
    '@type': string;
    logo?: { '@id': string };
    mainEntity?: string;
    mainEntityOfPage?: string;
};

export type Thing = WithId<WebPage | ImageObject | OrgWithLogoRef>;

export type BaseJsonLd = {
    '@context': string | string[];
    '@graph': Thing[];
};

export type JsonLdData = BaseJsonLd;
