import React from 'react';
import { FilterLogic, FilterSelection } from 'types/component-props/_mixins';
import { useFilterState } from '../../../store/hooks/useFilteredContent';

type Props = {
    filters: string[];
    filterLogic: FilterLogic;
    children: React.ReactNode;
};

const checkForFilterMatch = (
    filters: string[],
    selectedFilters: FilterSelection,
    filterLogic: FilterLogic
) => {
    if (filterLogic === 'and' && selectedFilters.length > 1) {
        return filters.every((filter) => selectedFilters.includes(filter));
    }

    return filters.some((filter) => selectedFilters.includes(filter));
};

export const FilteredContent = ({ filters, children, filterLogic }: Props) => {
    const { selectedFilters, availableFilters } = useFilterState();

    // Existing product pages might not have filterLogic set for all htmlareas.
    const normalizedFilterLogic = filterLogic || 'or';

    // No filters were set for this particular part, so let children through.
    if (!filters) {
        return <>{children}</>;
    }

    // If no filters are set for a catetory that this part "belongs to"
    // the part should display as default. To achieve this, we need to find out
    // which categories the part belongs to in the first place.
    const relevantCategories = availableFilters.filter((category) => {
        return category.filters.some((filter) => filters.includes(filter.id));
    });

    const isAffectedByFiltering = relevantCategories.some((category) => {
        return category.filters.some((filter) =>
            selectedFilters.includes(filter.id)
        );
    });

    const isFilterMatch = checkForFilterMatch(
        filters,
        selectedFilters,
        filterLogic
    );

    if (isAffectedByFiltering && !isFilterMatch) {
        return null;
    }

    return <>{children}</>;
};
