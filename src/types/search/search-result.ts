import { EnonicContentRef } from '../../utils/paths';

export enum DaterangeKey {
    Last7Days = 'Siste 7 dager',
    Last30Days = 'Siste 30 dager',
    Last12Months = 'Siste 12 måneder',
    Over12Months = 'Eldre enn 12 måneder',
    All = 'Alle datoer',
}

export type DaterangeBucket = {
    key: DaterangeKey;
    docCount: number;
    checked: boolean;
    to?: string;
    from?: string;
};

export type DaterangeProps = {
    docCount: number;
    checked: boolean;
    buckets: DaterangeBucket[];
};

export type FacetBucket = {
    key: string;
    docCount: number;
    checked: boolean;
    className: string;
    underaggregeringer: { buckets: FacetBucket[] };
    default?: boolean;
    defaultClassName?: string;
};

export type SearchHit = {
    priority: boolean;
    displayName: string;
    href: string;
    displayPath: string;
    highlight: string;
    publish: {
        from: string;
        first: string;
    };
    modifiedTime: string;
    className: string;
    publishedString: string;
    id: EnonicContentRef;
    score: number;
    keywords: string[];
};

export type SearchResult = {
    c: number;
    isSortDate: boolean;
    s: number;
    daterange: number;
    isMore: boolean;
    word: string;
    total: number;
    fasett: string;
    aggregations: {
        fasetter: { buckets: FacetBucket[] };
        Tidsperiode: DaterangeProps;
    };
    hits: SearchHit[];
    prioritized: SearchHit[];
};
