import React, { useEffect } from 'react';
import { OverviewAreaFilter } from 'components/_common/overview-filters/area-filter/OverviewAreaFilter';
import { OverviewTaxonomyFilter } from 'components/_common/overview-filters/taxonomy-filter/OverviewTaxonomyFilter';
import { OverviewTextFilter } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';
import {
    OverviewFilterableItem,
    useOverviewFiltersState,
} from 'store/hooks/useOverviewFilters';
import { resetOverviewFiltersAction } from 'store/slices/overviewFilters';

type Props = {
    filterableItems: OverviewFilterableItem[];
    showTextInputFilter: boolean;
    showTaxonomyFilter: boolean;
    showAreaFilter: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const OverviewFilters = ({
    filterableItems,
    showTextInputFilter,
    showAreaFilter,
    showTaxonomyFilter,
    ...divAttribs
}: Props) => {
    const { dispatch } = useOverviewFiltersState();

    useEffect(() => {
        // Reset filters when the component dismounts
        return () => {
            dispatch(resetOverviewFiltersAction());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div {...divAttribs}>
            {showAreaFilter && <OverviewAreaFilter items={filterableItems} />}
            {showTaxonomyFilter && (
                <OverviewTaxonomyFilter items={filterableItems} />
            )}
            {showTextInputFilter && <OverviewTextFilter />}
        </div>
    );
};
