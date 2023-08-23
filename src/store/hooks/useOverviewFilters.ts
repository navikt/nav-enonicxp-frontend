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

const _getFilteredList = async <ItemType extends OverviewFilterableItem>({
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

    const itemsMatchingTagFilters = filterableItems.filter(
        (item: ItemType) => isAreaMatching(item) && isTaxonomyMatching(item)
    );

    if (!textFilter || !fuseOptions) {
        return itemsMatchingTagFilters;
    }

    return getFuseSearchFunc(itemsMatchingTagFilters, fuseOptions).then(
        (fuseSearchFunc) => {
            return fuseSearchFunc(textFilter);
        }
    );
};

export const useOverviewFilters = () => {
    const dispatch = useAppDispatch();

    const filtersState = useAppSelector((state) => state.overviewFilters);

    const { textFilter, areaFilter, taxonomyFilter } = filtersState;

    const hasDefaultFilters =
        textFilter === overviewFiltersInitialState.textFilter &&
        areaFilter === overviewFiltersInitialState.areaFilter &&
        taxonomyFilter === overviewFiltersInitialState.taxonomyFilter;

    const getFilteredList = useCallback(
        <ItemType extends OverviewFilterableItem>(
            props: FilteredListProps<ItemType>
        ) => {
            return _getFilteredList({ ...props, filters: filtersState });
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
