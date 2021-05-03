import React from 'react';
import { useFilterState } from '../../../store/hooks/useFilteredContent';

type Props = {
    filters: string[];
    children: React.ReactNode;
};

export const FilteredContent = ({ filters, children }: Props) => {
    const { selectedFilters, availableFilters } = useFilterState();

    // No filters were set for this particular content, so let children through.
    if (!filters) {
        return <>{children}</>;
    }

    // If no filters are set for a catetory that this text block "belongs to"
    // it should display as default. To achieve this, we need to find out
    // which categories are relevant in the first place.
    const relevantCategories = availableFilters.filter((category) => {
        return category.filters.some((filter) => filters.includes(filter.id));
    });

    const isFilteringOnRelevantCategories = relevantCategories.some(
        (category) => {
            return category.filters.some((filter) =>
                selectedFilters.includes(filter.id)
            );
        }
    );

    const contentMatchesFilters = filters.some((filter) =>
        selectedFilters.includes(filter)
    );

    if (isFilteringOnRelevantCategories && !contentMatchesFilters) {
        return null;
    }

    return <>{children}</>;
};
