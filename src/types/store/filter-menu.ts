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

export type FilterSelectionPayload = {
    pageId: string;
    filterId: string;
};

export type AvailableFiltersPayload = {
    pageId: string;
    availableFilters: Category[];
};
