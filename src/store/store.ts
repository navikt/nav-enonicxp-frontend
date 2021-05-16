import { configureStore } from '@reduxjs/toolkit';
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
