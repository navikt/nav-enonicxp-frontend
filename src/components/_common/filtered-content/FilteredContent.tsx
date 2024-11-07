import React from 'react';
import { FilterSelection } from 'types/component-props/_mixins';
import { useFilterState } from 'store/hooks/useFilteredContent';

type Props = {
    filters?: string[];
    children: React.ReactNode;
};

const checkForFilterMatch = (filters: string[], selectedFilters: FilterSelection) =>
    filters.some((filter) => selectedFilters.includes(filter));

/** @deprecated */
//Denne komponenten brukes ikke egentlig lenger, men beholdes foreløpig for å kunne vise sider riktig i versjonshistorikken
export const FilteredContent = ({ filters, children }: Props) => {
    const { selectedFilters, availableFilters } = useFilterState();

    // No filters were set for this particular part, so let children through.
    if (!filters) {
        return <>{children}</>;
    }

    // The component has filters set, but no actuals filters are available for the page.
    // This case is an invalid state, so just show the component.
    if (availableFilters.length === 0) {
        return <>{children}</>;
    }

    // If no filters are set for a catetory that this part "belongs to"
    // the part should display as default. To achieve this, we need to find out
    // which categories the part belongs to in the first place.
    const relevantCategories = availableFilters.filter((category) => {
        return category.filters.some((filter) => filters.includes(filter.id));
    });

    const isAffectedByFiltering = relevantCategories.some((category) => {
        return category.filters.some((filter) => selectedFilters.includes(filter.id));
    });

    const isFilterMatch = checkForFilterMatch(filters, selectedFilters);

    if (isAffectedByFiltering && !isFilterMatch) {
        return null;
    }

    return <>{children}</>;
};
