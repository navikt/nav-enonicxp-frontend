import { useCallback } from 'react';
import { IFuseOptions } from 'fuse.js';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Area } from 'types/areas';
import {
    overviewFiltersInitialState,
    OverviewFiltersState,
    resetOverviewFiltersAction,
    setAreaFilterAction,
    setTextFilterAction,
} from 'store/slices/overviewFilters';
import { ContentType } from 'types/content-props/_content-common';
import { getFuseSearchFunc } from 'utils/text-search-utils';

export type OverviewFilterableItem = {
    area: Area[];
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
    const { textFilter, areaFilter } = filters;
    const textFilterActual = textFilterOverride || textFilter;
    const isAreaMatching = (item: ItemType) =>
        areaFilter === Area.ALL || item.area.includes(areaFilter);
    const itemsMatchingToggleFilters = filterableItems.filter(
        (item: ItemType) => isAreaMatching(item)
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
    const { textFilter, areaFilter } = filtersState;

    const hasDefaultFilters =
        textFilter === overviewFiltersInitialState.textFilter &&
        areaFilter === overviewFiltersInitialState.areaFilter;

    const getFilteredList = useCallback(
        <ItemType extends OverviewFilterableItem>(props: FilteredListProps<ItemType>) => {
            return _getFilteredList({ ...props, filters: filtersState });
        },
        [filtersState]
    );
    const setAreaFilter = useCallback(
        (area: Area) => dispatch(setAreaFilterAction({ area })),
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
        textFilter,
        getFilteredList,
        setAreaFilter,
        setTextFilter,
        resetFilters,
    };
};
