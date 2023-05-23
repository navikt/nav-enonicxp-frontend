import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { OVERVIEW_FILTERS_TEXT_INPUT_EVENT } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';

export type OverviewFiltersState = {
    areaFilter: Area;
    taxonomyFilter: ProductTaxonomy;
    textFilter: string;
};

export const overviewFiltersInitialState: OverviewFiltersState = {
    textFilter: '',
    areaFilter: Area.ALL,
    taxonomyFilter: ProductTaxonomy.ALL,
};

const overviewFiltersSlice = createSlice({
    name: 'overviewFilters',
    initialState: overviewFiltersInitialState,
    reducers: {
        setArea: (state, action: PayloadAction<{ area: Area }>) => {
            const { area } = action.payload;
            return { ...state, areaFilter: area };
        },
        setTaxonomy: (
            state,
            action: PayloadAction<{ taxonomy: ProductTaxonomy }>
        ) => {
            const { taxonomy } = action.payload;
            return { ...state, taxonomyFilter: taxonomy };
        },
        setTextFilter: (state, action: PayloadAction<{ text: string }>) => {
            const { text } = action.payload;
            return { ...state, textFilter: text };
        },
        resetFilters: () => {
            window.dispatchEvent(
                new CustomEvent(OVERVIEW_FILTERS_TEXT_INPUT_EVENT, {
                    detail: '',
                })
            );
            return overviewFiltersInitialState;
        },
    },
});

export const {
    setArea: setAreaFilterAction,
    setTaxonomy: setTaxonomyFilterAction,
    setTextFilter: setTextFilterAction,
    resetFilters: resetOverviewFiltersAction,
} = overviewFiltersSlice.actions;

export default overviewFiltersSlice.reducer;
