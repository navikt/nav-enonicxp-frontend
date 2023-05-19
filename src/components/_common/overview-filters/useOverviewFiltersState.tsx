import React, { Dispatch, useReducer } from 'react';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { ContentType } from 'types/content-props/_content-common';

export type OverviewFilterableContent = {
    area: Area[];
    taxonomy: ProductTaxonomy[];
    text?: string;
    type?: ContentType;
};

export type OverviewFiltersState = {
    areaFilter: Area;
    taxonomyFilter: ProductTaxonomy;
    textFilter: string;
};

export type OverviewFiltersDispatch = Dispatch<Actions>;

type Actions =
    | {
          type: 'setArea';
          area: Area;
      }
    | {
          type: 'setTaxonomy';
          taxonomy: ProductTaxonomy;
      }
    | {
          type: 'setTextFilter';
          text: string;
      }
    | {
          type: 'resetFilters';
      };

const filtersDefault: OverviewFiltersState = {
    textFilter: '',
    areaFilter: Area.ALL,
    taxonomyFilter: ProductTaxonomy.ALL,
};

const reducer = (
    state: OverviewFiltersState,
    action: Actions
): OverviewFiltersState => {
    switch (action.type) {
        case 'setArea': {
            return {
                ...state,
                areaFilter: action.area,
            };
        }
        case 'setTaxonomy': {
            return {
                ...state,
                taxonomyFilter: action.taxonomy,
            };
        }
        case 'setTextFilter': {
            return {
                ...state,
                textFilter: action.text,
            };
        }
        case 'resetFilters': {
            return filtersDefault;
        }
        default: {
            return state;
        }
    }
};

export const useOverviewFiltersState = () => {
    const [state, dispatch] = useReducer(reducer, filtersDefault);

    const { areaFilter, taxonomyFilter, textFilter } = state;

    const hasDefaultFilters =
        state.textFilter === filtersDefault.textFilter &&
        state.areaFilter === filtersDefault.areaFilter &&
        state.taxonomyFilter === filtersDefault.taxonomyFilter;

    const matchFilters = (filterableContent: OverviewFilterableContent) => {
        const isAreaMatching =
            areaFilter === Area.ALL ||
            filterableContent.area.includes(areaFilter);
        if (!isAreaMatching) {
            return false;
        }

        const isTaxonomyMatching =
            taxonomyFilter === ProductTaxonomy.ALL ||
            filterableContent.taxonomy.includes(taxonomyFilter) ||
            (taxonomyFilter === ProductTaxonomy.FORMS &&
                filterableContent.type !== 'no.nav.navno:guide-page');
        if (!isTaxonomyMatching) {
            return false;
        }

        const isSearchMatching =
            !textFilter ||
            filterableContent.text
                .toLowerCase()
                .includes(textFilter.toLowerCase());

        return isSearchMatching;
    };

    return {
        hasDefaultFilters,
        matchFilters,
        dispatch,
        state,
    };
};
