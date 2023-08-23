import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import {
    overviewFiltersInitialState,
    OverviewFiltersState,
} from 'store/slices/overviewFilters';
import { ContentType } from 'types/content-props/_content-common';
import { getFuseSearchFunc } from 'utils/text-search-utils';
import type Fuse from 'fuse.js';

export type OverviewFilterableItem = {
    area: Area[];
    taxonomy: ProductTaxonomy[];
    type?: ContentType;
};

type FilteredListProps<ItemType extends OverviewFilterableItem> = {
    filterableItems: ItemType[];
    fuseOptions?: Fuse.IFuseOptions<ItemType>;
};

const getFilterListFunc = async <ItemType extends OverviewFilterableItem>({
    filterableItems,
    filters,
    fuseOptions,
}: FilteredListProps<ItemType> & {
    filters: OverviewFiltersState;
}) => {
    const { textFilter, areaFilter, taxonomyFilter } = filters;

    const isAreaMatching = (item: ItemType) =>
        areaFilter === Area.ALL || item.area.includes(areaFilter);

    const isTaxonomyMatching = (item: ItemType) =>
        taxonomyFilter === ProductTaxonomy.ALL ||
        item.taxonomy.includes(taxonomyFilter) ||
        (taxonomyFilter === ProductTaxonomy.OTHER &&
            item.type === 'no.nav.navno:guide-page');

    const matchFilters = (item: ItemType) =>
        isAreaMatching(item) && isTaxonomyMatching(item);

    if (!textFilter || !fuseOptions) {
        return filterableItems.filter(matchFilters);
    }

    return getFuseSearchFunc(filterableItems, fuseOptions).then(
        (fuseSearchFunc) => {
            const result = fuseSearchFunc(textFilter);
            return result.filter(matchFilters);
        }
    );
};

export const useOverviewFiltersState = () => {
    const dispatch = useAppDispatch();

    const filtersState = useAppSelector((state) => state.overviewFilters);

    const { textFilter, areaFilter, taxonomyFilter } = filtersState;

    const hasDefaultFilters =
        textFilter === overviewFiltersInitialState.textFilter &&
        areaFilter === overviewFiltersInitialState.areaFilter &&
        taxonomyFilter === overviewFiltersInitialState.taxonomyFilter;

    const getFilteredList = useCallback(
        (props: FilteredListProps<any>) => {
            return getFilterListFunc({ ...props, filters: filtersState });
        },
        [filtersState]
    );

    return {
        hasDefaultFilters,
        dispatch,
        areaFilter,
        taxonomyFilter,
        textFilter,
        getFilteredList,
    };
};
