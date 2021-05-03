import React from 'react';
import { useFilterState } from '../../../store/hooks/useFilteredContent';

type Props = {
    filters: string[];
    children: React.ReactNode;
};

export const FilteredContent = ({ filters, children }: Props) => {
    // TODO: retrieve filter-states and pass through children only if one of the
    // filters from props are enabled (or if no filters are enabled)

    // Todo: Handle filter categories

    const { contentFilters } = useFilterState();

    if (!filters) {
        return <>{children}</>;
    }

    const normalizedFilters = typeof filters === 'string' ? [filters] : filters;

    const contentMatchesFilters =
        contentFilters.length === 0 ||
        normalizedFilters.some((filter) => contentFilters.includes(filter));

    if (!contentMatchesFilters) {
        return null;
    }

    return <>{children}</>;
};
