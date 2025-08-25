import { useCallback } from 'react';
import { IFuseOptions } from 'fuse.js';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Area } from 'types/areas';
import {
    oversiktFiltersInitialState,
    OversiktFiltersState,
    resetOversiktFiltersAction,
    setOmradeFilterAction,
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
    const { textFilter, omradeFilter } = filters;
    const textFilterActual = textFilterOverride || textFilter;
    const isOmradeMatching = (item: ItemType) =>
        omradeFilter === Area.ALL || item.area.includes(omradeFilter);
    const itemsMatchingToggleFilters = filterableItems.filter((item: ItemType) =>
        isOmradeMatching(item)
    );

    if (!textFilterActual || !fuseOptions) {
        // Sort using Norwegian locale to ensure Å comes last
        return itemsMatchingToggleFilters.sort((a, b) => {
            const titleA = (a as any).sortTitle || (a as any).title || '';
            const titleB = (b as any).sortTitle || (b as any).title || '';
            return titleA.localeCompare(titleB, 'no-NO');
        });
    }

    return getFuseSearchFunc(itemsMatchingToggleFilters, fuseOptions).then((fuseSearchFunc) => {
        return fuseSearchFunc(textFilterActual);
    });
};

export const useOversiktFilters = () => {
    const dispatch = useAppDispatch();
    const filtersState = useAppSelector((state) => state.oversiktFilters);
    const { textFilter, omradeFilter } = filtersState;

    const hasDefaultFilters =
        textFilter === oversiktFiltersInitialState.textFilter &&
        omradeFilter === oversiktFiltersInitialState.omradeFilter;

    const getFilteredList = useCallback(
        <ItemType extends OversiktFilterableItem>(props: FilteredListProps<ItemType>) => {
            return _getFilteredList({ ...props, filters: filtersState });
        },
        [filtersState]
    );
    const setOmradeFilter = useCallback(
        (omrade: Area) => dispatch(setOmradeFilterAction({ omrade })),
        [dispatch]
    );
    const setTextFilter = useCallback(
        (value: string) => dispatch(setTextFilterAction({ text: value })),
        [dispatch]
    );

    const resetFilters = useCallback(() => dispatch(resetOversiktFiltersAction()), [dispatch]);

    return {
        hasDefaultFilters,
        omradeFilter,
        textFilter,
        getFilteredList,
        setOmradeFilter,
        setTextFilter,
        resetFilters,
    };
};
