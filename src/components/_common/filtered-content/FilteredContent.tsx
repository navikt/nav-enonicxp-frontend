import React from 'react';

type Props = {
    filters: string[];
    children: React.ReactNode;
};

export const FilteredContent = ({ filters, children }: Props) => {
    // TODO: retrieve filter-states and pass through children only if one of the
    // filters from props are enabled (or if no filters are enabled)
    return <>{children}</>;
};
