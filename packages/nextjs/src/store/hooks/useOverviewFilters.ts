import { useCallback } from 'react';
import { IFuseOptions } from 'fuse.js';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import {
    overviewFiltersInitialState,
    OverviewFiltersState,
    resetOverviewFiltersAction,
    setAreaFilterAction,
    setTaxonomyFilterAction,
    setTextFilterAction,
} from 'store/slices/overviewFilters';
import { ContentType } from 'types/content-props/_content-common';
import { getFuseSearchFunc } from 'utils/text-search-utils';

export type OverviewFilterableItem = {
    area: Area[];
    taxonomy?: ProductTaxonomy[];
    type?: ContentType;
};

type FilteredListProps<ItemType extends OverviewFilterableItem> = {
    filterableItems: ItemType[];
    textFilterOverride?: string;
    fuseOptions?: IFuseOptions<ItemType>;
};

const _getFilteredList = async <ItemType extends OverviewFilterableItem>({
    filterableItems,
    textFilterOverride,
    fuseOptions,
    filters,
}: FilteredListProps<ItemType> & {
    filters: OverviewFiltersState;
}) => {
    const { textFilter, areaFilter, taxonomyFilter } = filters;

    const textFilterActual = textFilterOverride || textFilter;

    const isAreaMatching = (item: ItemType) =>
        areaFilter === Area.ALL || item.area.includes(areaFilter);

    const isTaxonomyMatching = (item: ItemType) =>
        taxonomyFilter === ProductTaxonomy.ALL ||
        item.taxonomy?.includes(taxonomyFilter) ||
        (taxonomyFilter === ProductTaxonomy.OTHER && item.type === 'no.nav.navno:guide-page');

    const itemsMatchingToggleFilters = filterableItems.filter(
        (item: ItemType) => isAreaMatching(item) && isTaxonomyMatching(item)
    );

    if (!textFilterActual || !fuseOptions) {
        return itemsMatchingToggleFilters;
    }

    return getFuseSearchFunc(itemsMatchingToggleFilters, fuseOptions).then((fuseSearchFunc) => {
        return fuseSearchFunc(textFilterActual);
    });
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
        <ItemType extends OverviewFilterableItem>(props: FilteredListProps<ItemType>) => {
            return _getFilteredList({ ...props, filters: filtersState });
        },
        [filtersState]
    );

    const setAreaFilter = useCallback(
        (area: Area) => dispatch(setAreaFilterAction({ omrade: area })),
        [dispatch]
    );

    const setTaxonomyFilter = useCallback(
        (taxonomy: ProductTaxonomy) => dispatch(setTaxonomyFilterAction({ taxonomy })),
        [dispatch]
    );

    const setTextFilter = useCallback(
        (value: string) => dispatch(setTextFilterAction({ text: value })),
        [dispatch]
    );

    const resetFilters = useCallback(() => dispatch(resetOverviewFiltersAction()), [dispatch]);

    return {
        hasDefaultFilters,
        areaFilter,
        taxonomyFilter,
        textFilter,
        getFilteredList,
        setAreaFilter,
        setTaxonomyFilter,
        setTextFilter,
        resetFilters,
    };
};
