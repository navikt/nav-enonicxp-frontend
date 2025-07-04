import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Area } from 'types/areas';

export type OversiktFiltersState = {
    areaFilter: Area;
    textFilter: string;
};

export const oversiktFiltersInitialState: OversiktFiltersState = {
    textFilter: '',
    areaFilter: Area.ALL,
};

export type OversiktFiltersTextInputEventDetail = { value: string; id: string };
export const OVERSIKT_FILTERS_TEXT_INPUT_EVENT = 'OversiktFiltersTextInput';

const oversiktFiltersSlice = createSlice({
    name: 'oversiktFilters',
    initialState: oversiktFiltersInitialState,
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
                new CustomEvent(OVERSIKT_FILTERS_TEXT_INPUT_EVENT, {
                    detail: { value: '' },
                })
            );
            return oversiktFiltersInitialState;
        },
    },
});

export const {
    setArea: setAreaFilterAction,
    setTextFilter: setTextFilterAction,
    resetFilters: resetOversiktFiltersAction,
} = oversiktFiltersSlice.actions;

export default oversiktFiltersSlice.reducer;
