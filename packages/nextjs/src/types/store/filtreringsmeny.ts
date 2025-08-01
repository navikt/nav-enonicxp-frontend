export type Filter = {
    filterName: string;
    id: string;
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
    pageId: string;
};

export type FilterSelectionPayload = BasePayload & {
    filterId: string;
};

export type AvailableFiltersPayload = BasePayload & {
    availableFilters: Category[];
};

export type ClearFiltersPayload = BasePayload & {
    filterIds?: string[];
};

export type SelectFiltersPayload = BasePayload & {
    filterIds: string[];
};
