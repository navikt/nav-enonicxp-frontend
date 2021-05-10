type FilterId = string;
type PageId = string;

export type Filter = {
    filterName: string;
    id: FilterId;
};

export type Category = {
    categoryName: string;
    filters: Filter[];
};

export type FilteredContentState = {
    [pageId: string]: {
        selectedFilters: string[];
        availableFilters: Category[];
    };
};

type BasePayload = {
    pageId: PageId;
};

export type FilterSelectionPayload = BasePayload & {
    filterId: FilterId;
};

export type AvailableFiltersPayload = BasePayload & {
    availableFilters: Category[];
};

export type ClearFiltersPayload = BasePayload & {
    filterIds?: FilterId[];
};

export type SelectFiltersPayload = BasePayload & {
    filterIds: FilterId[];
};
