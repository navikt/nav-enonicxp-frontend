import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { usePageConfig } from './usePageConfig';
import {
    availableFiltersAtPage,
    clearFiltersForPageAction,
    selectedFiltersAtPage,
    setAvailableFiltersAction,
    toggleFilterSelectionAction,
    clearFiltersAction,
} from '../slices/filteredContent';
import { Category } from 'types/store/filter-menu';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type FilterSelection = string[];

type UseFilterState = {
    availableFilters: Category[];
    clearFiltersForPage: () => void;
    selectedFilters: FilterSelection;
    setAvailableFilters: (availableFilters: Category[]) => void;
    toggleFilter: (filtr: string) => void;
    selectAllSituations: (categoryIndex: number) => void;
    clearFilters: (filterIds: string[]) => void;
};

export const useFilterState = (): UseFilterState => {
    const dispatch = useAppDispatch();

    const { pageConfig } = usePageConfig();
    const { pageId } = pageConfig;

    const availableFilters = useAppSelector<Category[]>((state) =>
        availableFiltersAtPage(state, pageId)
    );

    const clearFiltersForPage = () => {
        const payload = { pageId };
        dispatch(clearFiltersForPageAction(payload));
    };

    const clearFilters = (filterIds: string[]): void => {
        const payload = { pageId, filterIds };
        dispatch(clearFiltersAction(payload));
    };

    const selectedFilters = useAppSelector<FilterSelection>((state) =>
        selectedFiltersAtPage(state, pageId)
    );

    const selectAllSituations = (categoryIndex: number) => {
        const filtersInCategory = availableFilters[categoryIndex].filters.map(
            (filter) => filter.id
        );

        dispatch(clearFiltersAction({ pageId, filterIds: filtersInCategory }));
    };

    const setAvailableFilters = (availableFilters: Category[]) => {
        const payload = { pageId, availableFilters };
        dispatch(setAvailableFiltersAction(payload));
    };

    const toggleFilter = (filterId: string): void => {
        const payload = { pageId, filterId };
        dispatch(toggleFilterSelectionAction(payload));
    };

    return {
        availableFilters,
        clearFilters,
        clearFiltersForPage,
        selectAllSituations,
        selectedFilters,
        setAvailableFilters,
        toggleFilter,
    };
};
