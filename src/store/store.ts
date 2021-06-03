import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import contentFilters from './slices/filteredContent';
import pageConfig from './slices/pageConfig';

export const store = configureStore({
    reducer: {
        contentFilters,
        pageConfig,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Creates custom hooks with improved typing for this apps state.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
