import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Area } from 'types/areas';

export type OverviewFiltersState = {
    areaFilter: Area;
    textFilter: string;
};

export const overviewFiltersInitialState: OverviewFiltersState = {
    textFilter: '',
    areaFilter: Area.ALL,
};

export type OverviewFiltersTextInputEventDetail = { value: string; id: string };
export const OVERVIEW_FILTERS_TEXT_INPUT_EVENT = 'OverviewFiltersTextInput';

const overviewFiltersSlice = createSlice({
    name: 'overviewFilters',
    initialState: overviewFiltersInitialState,
    reducers: {
        setArea: (state, action: PayloadAction<{ area: Area }>) => {
            const { area } = action.payload;
            return { ...state, areaFilter: area };
        },
        setTextFilter: (state, action: PayloadAction<{ text: string }>) => {
            const { text } = action.payload;
            return { ...state, textFilter: text.toLowerCase().trim() };
        },
        resetFilters: () => {
            window.dispatchEvent(
                new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                    detail: { value: '' },
                })
            );
            return overviewFiltersInitialState;
        },
    },
});

export const {
    setArea: setAreaFilterAction,
    setTextFilter: setTextFilterAction,
    resetFilters: resetOverviewFiltersAction,
} = overviewFiltersSlice.actions;

export default overviewFiltersSlice.reducer;
