import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Area } from 'types/areas';

export type OversiktFiltersState = {
    omradeFilter: Area;
    textFilter: string;
};

export const oversiktFiltersInitialState: OversiktFiltersState = {
    textFilter: '',
    omradeFilter: Area.ALL,
};

export type OversiktFiltersTextInputEventDetail = { value: string; id: string };
export const OVERSIKT_FILTERS_TEXT_INPUT_EVENT = 'OversiktFiltersTextInput';

const oversiktFiltersSlice = createSlice({
    name: 'oversiktFilters',
    initialState: oversiktFiltersInitialState,
    reducers: {
        setOmrade: (state, action: PayloadAction<{ omrade: Area }>) => {
            const { omrade } = action.payload;
            return { ...state, omradeFilter: omrade };
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
    setOmrade: setOmradeFilterAction,
    setTextFilter: setTextFilterAction,
    resetFilters: resetOversiktFiltersAction,
} = oversiktFiltersSlice.actions;

export default oversiktFiltersSlice.reducer;
