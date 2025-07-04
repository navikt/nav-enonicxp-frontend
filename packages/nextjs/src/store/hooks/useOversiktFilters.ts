import { useCallback } from 'react';
import { IFuseOptions } from 'fuse.js';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Area } from 'types/areas';
import {
    oversiktFiltersInitialState,
    OversiktFiltersState,
    resetOversiktFiltersAction,
    setAreaFilterAction,
    setTextFilterAction,
} from 'store/slices/oversiktFilters';
import { getFuseSearchFunc } from 'utils/text-search-utils';

export type OversiktFilterableItem = {
    area: Area[];
};

type FilteredListProps<ItemType extends OversiktFilterableItem> = {
    filterableItems: ItemType[];
    textFilterOverride?: string;
    fuseOptions?: IFuseOptions<ItemType>;
};

const _getFilteredList = async <ItemType extends OversiktFilterableItem>({
    filterableItems,
    textFilterOverride,
    fuseOptions,
    filters,
}: FilteredListProps<ItemType> & {
    filters: OversiktFiltersState;
}) => {
    const { textFilter, areaFilter } = filters;
    const textFilterActual = textFilterOverride || textFilter;
    const isAreaMatching = (item: ItemType) =>
        areaFilter === Area.ALL || item.area.includes(areaFilter);
    const itemsMatchingToggleFilters = filterableItems.filter((item: ItemType) =>
        isAreaMatching(item)
    );

    if (!textFilterActual || !fuseOptions) {
        return itemsMatchingToggleFilters;
    }

    return getFuseSearchFunc(itemsMatchingToggleFilters, fuseOptions).then((fuseSearchFunc) => {
        return fuseSearchFunc(textFilterActual);
    });
};

export const useOversiktFilters = () => {
    const dispatch = useAppDispatch();
    const filtersState = useAppSelector((state) => state.oversiktFilters);
    const { textFilter, areaFilter } = filtersState;

    const hasDefaultFilters =
        textFilter === oversiktFiltersInitialState.textFilter &&
        areaFilter === oversiktFiltersInitialState.areaFilter;

    const getFilteredList = useCallback(
        <ItemType extends OversiktFilterableItem>(props: FilteredListProps<ItemType>) => {
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

    const resetFilters = useCallback(() => dispatch(resetOversiktFiltersAction()), [dispatch]);

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
