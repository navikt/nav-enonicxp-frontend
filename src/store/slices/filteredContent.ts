import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import {
    FilteredContentState,
    FilterSelectionPayload,
    AvailableFiltersPayload,
    ClearFiltersPayload,
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

            const updatedSelectedFilters: string[] = selectedFilters.includes(
                filterId
            )
                ? selectedFilters.filter((item) => item !== filterId)
                : [...selectedFilters, filterId];

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
        clearFiltersForPage: (
            state,
            action: PayloadAction<ClearFiltersPayload>
        ) => {
            const { pageId } = action.payload;
            state[pageId].selectedFilters = [];
        },
    },
});

export const {
    clearFiltersForPage: clearFiltersForPageAction,
    setAvailableFilters: setAvailableFiltersAction,
    toggleFilterSelection: toggleFilterSelectionAction,
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
