import React, { useContext, useState } from 'react';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';

type FiltersState = {
    areaFilter: Area;
    setAreaFilter: (area: Area) => void;
    taxonomyFilter: ProductTaxonomy;
    setTaxonomyFilter: (taxonomy: ProductTaxonomy) => void;
    textFilter: string;
    setTextFilter: (text: string) => void;
};

type FilterableContent = {
    text: string;
    area: Area[];
    taxonomy: ProductTaxonomy[];
};

const defaultState: FiltersState = {
    textFilter: '',
    areaFilter: Area.ALL,
    taxonomyFilter: ProductTaxonomy.ALL,
    setTaxonomyFilter: () => ({}),
    setAreaFilter: () => ({}),
    setTextFilter: () => ({}),
};

const FiltersContext = React.createContext<FiltersState>(defaultState);

export const useOverviewFilters = () => {
    const state = useContext(FiltersContext);
    const [textFilter, setTextFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState(Area.ALL);
    const [taxonomyFilter, setTaxonomyFilter] = useState(ProductTaxonomy.ALL);

    const resetFilters = () => {
        setTextFilter(defaultState.textFilter);
        setAreaFilter(defaultState.areaFilter);
        setTaxonomyFilter(defaultState.taxonomyFilter);
    };

    const isMatchingFilters = (filterableContent: FilterableContent) => {
        const isAreaMatching =
            areaFilter === Area.ALL ||
            filterableContent.area.includes(areaFilter);
        if (!isAreaMatching) {
            return false;
        }

        const isTaxonomyMatching =
            taxonomyFilter === ProductTaxonomy.ALL ||
            filterableContent.taxonomy.includes(taxonomyFilter);
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
        ...state,
        resetFilters,
        isMatchingFilters,
        OverviewFiltersProvider: ({
            children,
        }: {
            children: React.ReactNode;
        }) => (
            <FiltersContext.Provider
                value={{
                    textFilter,
                    taxonomyFilter,
                    areaFilter,
                    setTaxonomyFilter,
                    setTextFilter,
                    setAreaFilter,
                }}
            >
                {children}
            </FiltersContext.Provider>
        ),
    };
};
