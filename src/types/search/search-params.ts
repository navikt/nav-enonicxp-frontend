import { DaterangeKey } from './search-result';

export const daterangeKeyToParam = {
    [DaterangeKey.All]: -1,
    [DaterangeKey.Over12Months]: 0,
    [DaterangeKey.Last12Months]: 1,
    [DaterangeKey.Last30Days]: 2,
    [DaterangeKey.Last7Days]: 3,
};

export enum SearchSort {
    BestMatch = 0,
    Newest = 1,
}

export type SearchParams = {
    // Search string
    ord?: string;
    // Facet
    f?: number;
    // Under-facets
    uf?: number | number[];
    // Number of results to retrieve (<chunk_count> * c)
    c?: number;
    s?: SearchSort;
    daterange?: number;
};
