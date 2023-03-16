import { useAppDispatch, useAppSelector } from '../store';
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
import { FilterSelection } from 'types/component-props/_mixins';

type UseFilterState = {
    availableFilters: Category[];
    clearFilters: (filterIds: string[]) => void;
    clearFiltersForPage: () => void;
    selectedFilters: FilterSelection;
    setAvailableFilters: (availableFilters: Category[]) => void;
    toggleFilter: (filtr: string) => void;
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

    const setAvailableFilters = (newAvailableFilters: Category[] = []) => {
        const payload = { pageId, availableFilters: newAvailableFilters };
        if (newAvailableFilters.length > 0) {
            dispatch(setAvailableFiltersAction(payload));
        }
    };

    const toggleFilter = (filterId: string): void => {
        const payload = { pageId, filterId };
        dispatch(toggleFilterSelectionAction(payload));
    };

    return {
        availableFilters,
        clearFilters,
        clearFiltersForPage,
        selectedFilters,
        setAvailableFilters,
        toggleFilter,
    };
};
