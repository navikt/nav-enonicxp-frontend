import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    selectedFiltersAtPage,
    toggleFilterSelectionAction,
} from '../slices/filteredContent';
import { usePageConfig } from './usePageConfig';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type FilterSelection = string[];

type UseFilterState = {
    contentFilters: FilterSelection;
    toggleFilter: (filterid: string) => void;
};

export const useFilterState = (): UseFilterState => {
    const dispatch = useAppDispatch();

    const { pageConfig } = usePageConfig();
    const { pageId } = pageConfig;

    const contentFilters = useAppSelector<FilterSelection>((state) =>
        selectedFiltersAtPage(state, pageId)
    );

    const toggleFilter = (filterId: string): void => {
        const payload = { pageId, filterId };
        dispatch(toggleFilterSelectionAction(payload));
    };

    return { contentFilters, toggleFilter };
};
