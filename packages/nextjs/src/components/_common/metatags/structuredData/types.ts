import { WithContext, WebPage, Organization, ImageObject } from 'schema-dts';
export type PageType = WebPage['@type'];

export type BaseJsonLd<T extends WebPage> = {
    '@context': string | string[];
    '@graph': Array<any>;
};

export type GraphEntity =
    | (WebPage & { '@id': string })
    | (Organization & { '@id': string; logo?: { '@id': string } })
    | (ImageObject & { '@id': string });

export type JsonLdData = BaseJsonLd<WebPage>;
