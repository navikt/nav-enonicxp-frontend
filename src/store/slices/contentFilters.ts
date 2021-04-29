import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface ContentFilterState {
    [key: string]: string[];
}

interface Payload {
    pageId: string;
    filterId: string;
}

const initialState: ContentFilterState = {};

export const contentFiltersSlice = createSlice({
    name: 'contentFilter',
    initialState,
    reducers: {
        toggleFilter: (state, action: PayloadAction<Payload>) => {
            const { payload } = action;
            const { pageId, filterId } = payload;
            const filterState = state[pageId] || [];
            const filterIdPosition = filterState.findIndex(
                (item) => item === filterId
            );
            const updatedFilterState =
                filterIdPosition > -1
                    ? filterState.slice(filterIdPosition)
                    : [...filterState, filterId];
            state[pageId] = updatedFilterState;
        },
    },
});

export const { toggleFilter: toggleFilterAction } = contentFiltersSlice.actions;

export const selectFilter = (state: RootState, pageId): string[] =>
    state.contentFilters[pageId] || [];

export default contentFiltersSlice.reducer;
