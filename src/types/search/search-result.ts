import { EnonicContentRef } from '../../utils/paths';

export enum DaterangeKey {
    Last7Days = 'Siste 7 dager',
    Last30Days = 'Siste 30 dager',
    Last12Months = 'Siste 12 måneder',
    Over12Months = 'Eldre enn 12 måneder',
    All = 'Alle datoer',
}

export type DaterangeBucketProps = {
    key: DaterangeKey;
    docCount: number;
    checked: boolean;
    to?: string;
    from?: string;
};

export type DaterangeProps = {
    docCount: number;
    checked: boolean;
    buckets: DaterangeBucketProps[];
};

export type FacetBucketProps = {
    key: string;
    docCount: number;
    checked: boolean;
    className: string;
    underaggregeringer: { buckets: FacetBucketProps[] };
    default?: boolean;
    defaultClassName?: string;
};

export type SearchHitProps = {
    priority: boolean;
    displayName: string;
    href: string;
    displayPath: string;
    highlight: string;
    publish: {
        from?: string;
        first?: string;
    };
    modifiedTime: string;
    className: string;
    publishedString: string;
    id: EnonicContentRef;
    score: number;
    keywords: string[];
};

export type SearchResultProps = {
    c: number;
    isSortDate: boolean;
    s: string;
    daterange: string;
    isMore: boolean;
    word: string;
    total: string;
    fasett: string;
    aggregations: {
        fasetter: { buckets: FacetBucketProps[] };
        Tidsperiode: DaterangeProps;
    };
    hits: SearchHitProps[];
    prioritized: SearchHitProps[];
};
