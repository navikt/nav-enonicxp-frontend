import React from 'react';
import { OverviewAreaFilter } from 'components/_common/overview-filters/area-filter/OverviewAreaFilter';
import { OverviewTaxonomyFilter } from 'components/_common/overview-filters/taxonomy-filter/OverviewTaxonomyFilter';
import { OverviewTextFilter } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';
import { OverviewFilterableItem } from 'store/hooks/useOverviewFilters';

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
