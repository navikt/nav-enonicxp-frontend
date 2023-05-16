import React, { useContext, useState } from 'react';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { FormDetailsListItemProps } from 'types/content-props/forms-overview';

type FiltersState = {
    areaFilter: Area;
    taxonomyFilter: ProductTaxonomy;
    textFilter: string;
};

type FilterableContent = {
    text: string;
    area: Area[];
    taxonomy: ProductTaxonomy[];
};

const defaultState = {
    textFilter: '',
    areaFilter: Area.ALL,
    taxonomyFilter: ProductTaxonomy.ALL,
};

const FiltersContext = React.createContext<FiltersState>(defaultState);

export const useOverviewFilters = () => {
    const filtersState = useContext(FiltersContext);

    const [areaFilter, setAreaFilter] = useState<Area>(Area.ALL);
    const [taxonomyFilter, setTaxonomyFilter] = useState<ProductTaxonomy>(
        ProductTaxonomy.ALL
    );
    const [textFilter, setTextFilter] = useState<string>('');

    const resetFilters = () => {
        setTextFilter(defaultState.textFilter);
        setAreaFilter(defaultState.areaFilter);
        setTaxonomyFilter(defaultState.taxonomyFilter);
    };

    console.log(filtersState, areaFilter, taxonomyFilter);

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
        setAreaFilter,
        setTaxonomyFilter,
        setTextFilter,
        resetFilters,
        isMatchingFilters,
        filtersState,
        OverviewFiltersProvider: ({
            children,
        }: {
            children: React.ReactNode;
        }) => (
            <FiltersContext.Provider
                value={{ textFilter, taxonomyFilter, areaFilter }}
            >
                {children}
            </FiltersContext.Provider>
        ),
    };
};
