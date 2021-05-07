import React from 'react';
import { useFilterState } from '../../../store/hooks/useFilteredContent';

type Props = {
    filters: string[];
    children: React.ReactNode;
};

export const FilteredContent = ({ filters, children }: Props) => {
    const { selectedFilters, availableFilters } = useFilterState();

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

    const isFilteringOnRelevantCategories = relevantCategories.some(
        (category) => {
            return category.filters.some((filter) =>
                selectedFilters.includes(filter.id)
            );
        }
    );

    const isContentMatchingFilters = filters.some((filter) =>
        selectedFilters.includes(filter)
    );

    if (isFilteringOnRelevantCategories && !isContentMatchingFilters) {
        return null;
    }

    return <>{children}</>;
};
