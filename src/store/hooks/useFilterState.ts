import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { selectFilter, toggleFilterAction } from '../slices/contentFilters';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type UseFilterState = {
    contentFilters: string[];
    toggleFilter: (payload: any) => void;
};

type Filters = string[];

export const useFilterState = (pageId): UseFilterState => {
    const dispatch = useAppDispatch();
    const contentFilters = useAppSelector<Filters>((state) => {
        return selectFilter(state, pageId);
    });

    const toggleFilter = (payload) => {
        dispatch(toggleFilterAction(payload));
    };

    return { contentFilters, toggleFilter };
};
