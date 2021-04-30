import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface FilteredContentState {
    [key: string]: string[];
}

interface FilterSelectionPayload {
    pageId: string;
    filterId: string;
}

const initialState: FilteredContentState = {};

export const filteredContentSlice = createSlice({
    name: 'filteredContent',
    initialState,
    reducers: {
        toggleFilterSelection: (
            state,
            action: PayloadAction<FilterSelectionPayload>
        ) => {
            const { pageId, filterId } = action.payload;
            const selectedFilters = state[pageId] || [];

            if (selectedFilters.includes(filterId)) {
                state[pageId] = selectedFilters.filter(
                    (item) => item !== filterId
                );
            } else {
                state[pageId] = [...selectedFilters, filterId];
            }
        },
    },
});

export const {
    toggleFilterSelection: toggleFilterSelectionAction,
} = filteredContentSlice.actions;

export const selectedFiltersAtPage = (
    state: RootState,
    pageId: string
): string[] => {
    return state.contentFilters[pageId] || [];
};

export default filteredContentSlice.reducer;
