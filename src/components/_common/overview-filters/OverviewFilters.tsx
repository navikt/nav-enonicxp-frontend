import React from 'react';
import { OverviewAreaFilter } from 'components/_common/overview-filters/area-filter/OverviewAreaFilter';
import { Area } from 'types/areas';
import { OverviewTaxonomyFilter } from 'components/_common/overview-filters/taxonomy-filter/OverviewTaxonomyFilter';
import { ProductTaxonomy } from 'types/taxonomies';
import { OverviewTextFilter } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';
import { ContentType } from 'types/content-props/_content-common';

type ContentItem = {
    area: Area[];
    taxonomy: ProductTaxonomy[];
    type?: ContentType;
};

type Props = {
    contentList: ContentItem[];
    showTextInputFilter: boolean;
    showTaxonomyFilter: boolean;
    showAreaFilter: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const OverviewFilters = ({
    contentList,
    showTextInputFilter,
    showAreaFilter,
    showTaxonomyFilter,
    ...divAttribs
}: Props) => {
    return (
        <div {...divAttribs}>
            {showAreaFilter && <OverviewAreaFilter contentList={contentList} />}
            {showTaxonomyFilter && (
                <OverviewTaxonomyFilter contentList={contentList} />
            )}
            {showTextInputFilter && <OverviewTextFilter />}
        </div>
    );
};
