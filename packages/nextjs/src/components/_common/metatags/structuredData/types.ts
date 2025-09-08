import { WithContext, WebPage } from 'schema-dts';
export type PageType = WebPage['@type'];

export type BaseJsonLd<T extends WebPage> = WithContext<T> & {
    '@context': string | string[];
    '@type': PageType;
    name?: string;
    description?: string;
    url?: string;
    datePublished?: string;
    dateModified?: string;
    author?: {
        '@type': string;
        name: string;
        url?: string;
    };
};

export type JsonLdData = BaseJsonLd<WebPage>;
