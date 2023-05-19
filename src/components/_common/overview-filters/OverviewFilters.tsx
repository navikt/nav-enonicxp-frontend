import React from 'react';
import { OverviewAreaFilter } from 'components/_common/overview-filters/area-filter/OverviewAreaFilter';
import { Area } from 'types/areas';
import { OverviewTaxonomyFilter } from 'components/_common/overview-filters/taxonomy-filter/OverviewTaxonomyFilter';
import { ProductTaxonomy } from 'types/taxonomies';
import { OverviewTextFilter } from 'components/_common/overview-filters/text-filter/OverviewTextFilter';
import { ContentType } from 'types/content-props/_content-common';
import {
    OverviewFiltersDispatch,
    OverviewFiltersState,
} from 'components/_common/overview-filters/useOverviewFiltersState';

type ContentItem = {
    area: Area[];
    taxonomy: ProductTaxonomy[];
    type?: ContentType;
};

type Props = {
    contentList: ContentItem[];
    state: OverviewFiltersState;
    dispatch: OverviewFiltersDispatch;
    showTextInputFilter: boolean;
    showTaxonomyFilter: boolean;
    showAreaFilter: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const OverviewFilters = ({
    contentList,
    state,
    dispatch,
    showTextInputFilter,
    showAreaFilter,
    showTaxonomyFilter,
    ...divAttribs
}: Props) => {
    return (
        <div {...divAttribs}>
            {showAreaFilter && (
                <OverviewAreaFilter
                    contentList={contentList}
                    setAreaFilter={(area: Area) =>
                        dispatch({ type: 'setArea', area })
                    }
                    areaFilter={state.areaFilter}
                />
            )}
            {showTaxonomyFilter && (
                <OverviewTaxonomyFilter
                    contentList={contentList}
                    setTaxonomyFilter={(taxonomy: ProductTaxonomy) =>
                        dispatch({ type: 'setTaxonomy', taxonomy })
                    }
                    taxonomyFilter={state.taxonomyFilter}
                />
            )}
            {showTextInputFilter && (
                <OverviewTextFilter
                    textFilter={state.textFilter}
                    setTextFilter={(text: string) =>
                        dispatch({ type: 'setTextFilter', text })
                    }
                />
            )}
        </div>
    );
};
