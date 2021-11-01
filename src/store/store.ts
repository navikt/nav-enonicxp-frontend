import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import contentFilters from './slices/filteredContent';
import pageConfig from './slices/pageConfig';
import pathMap from './slices/pathMap';
import authState from './slices/authState';

export const store = configureStore({
    reducer: {
        contentFilters,
        pageConfig,
        pathMap,
        authState,
    },
});

// MockStore is used by component-preview etc in order to be able to
// provide a store to the underlying components to get them to work on a basic level,
// without affecting the entire pages store.
export const mockStore = configureStore({
    reducer: {
        contentFilters,
        pageConfig,
        pathMap,
        authState,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Creates custom hooks with improved typing for this apps state.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
