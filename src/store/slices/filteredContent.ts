import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import {
    FilteredContentState,
    FilterSelectionPayload,
    AvailableFiltersPayload,
    Category,
} from '../../types/store/filter-menu';

const initialState: FilteredContentState = {};

const defaultFiltersForPage = { selectedFilters: [], availableFilters: [] };

export const filteredContentSlice = createSlice({
    name: 'filteredContent',
    initialState,
    reducers: {
        toggleFilterSelection: (
            state,
            action: PayloadAction<FilterSelectionPayload>
        ) => {
            const { pageId, filterId } = action.payload;
            const filtersForPage = state[pageId] || {
                ...defaultFiltersForPage,
            };
            const { selectedFilters } = filtersForPage;

            let updatedSelectedFilters;

            if (selectedFilters.includes(filterId)) {
                updatedSelectedFilters = selectedFilters.filter(
                    (item) => item !== filterId
                );
            } else {
                updatedSelectedFilters = [...selectedFilters, filterId];
            }

            state[pageId] = {
                ...filtersForPage,
                selectedFilters: updatedSelectedFilters,
            };
        },
        setAvailableFilters: (
            state,
            action: PayloadAction<AvailableFiltersPayload>
        ) => {
            const { pageId, availableFilters } = action.payload;
            const filtersForPage = state[pageId] || {
                ...defaultFiltersForPage,
            };

            state[pageId] = { ...filtersForPage, availableFilters };
        },
    },
});

export const {
    toggleFilterSelection: toggleFilterSelectionAction,
    setAvailableFilters: setAvailableFiltersAction,
} = filteredContentSlice.actions;

export const selectedFiltersAtPage = (
    state: RootState,
    pageId: string
): string[] => {
    const pageFilters = state.contentFilters[pageId] || defaultFiltersForPage;

    return pageFilters.selectedFilters || [];
};

export const availableFiltersAtPage = (
    state: RootState,
    pageId: string
): Category[] => {
    const pageFilters = state.contentFilters[pageId] || defaultFiltersForPage;

    return pageFilters.availableFilters || [];
};

export default filteredContentSlice.reducer;
