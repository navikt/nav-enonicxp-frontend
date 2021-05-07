import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { usePageConfig } from './usePageConfig';
import {
    availableFiltersAtPage,
    clearFiltersForPageAction,
    selectedFiltersAtPage,
    setAvailableFiltersAction,
    toggleFilterSelectionAction,
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
    toggleFilter: (filterid: string) => void;
};

export const useFilterState = (): UseFilterState => {
    const dispatch = useAppDispatch();

    const { pageConfig } = usePageConfig();
    const { pageId } = pageConfig;

    const selectedFilters = useAppSelector<FilterSelection>((state) =>
        selectedFiltersAtPage(state, pageId)
    );

    const availableFilters = useAppSelector<Category[]>((state) =>
        availableFiltersAtPage(state, pageId)
    );

    const toggleFilter = (filterId: string): void => {
        const payload = { pageId, filterId };
        dispatch(toggleFilterSelectionAction(payload));
    };

    const setAvailableFilters = (availableFilters: Category[]) => {
        const payload = { pageId, availableFilters };
        dispatch(setAvailableFiltersAction(payload));
    };

    const clearFiltersForPage = () => {
        const payload = { pageId };
        dispatch(clearFiltersForPageAction(payload));
    };

    return {
        selectedFilters,
        availableFilters,
        toggleFilter,
        setAvailableFilters,
        clearFiltersForPage,
    };
};
