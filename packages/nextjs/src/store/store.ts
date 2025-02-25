import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import overviewFilters from 'store/slices/overviewFilters';
import contentFilters from './slices/filteredContent';
import gvEditorState from './slices/gvEditorState';
import authState from './slices/authState';

const options = {
    reducer: {
        contentFilters,
        gvEditorState,
        authState,
        overviewFilters,
    },
};

export const store = configureStore(options);

// MockStore is used by component-preview etc in order to be able to
// provide a store to the underlying components to get them to work on a basic level,
// without affecting the entire pages store.
export const mockStore = configureStore(options);

export const createNewStore = () => configureStore(options);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Creates custom hooks with improved typing for this apps state.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
