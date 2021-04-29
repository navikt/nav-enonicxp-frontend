import { configureStore } from '@reduxjs/toolkit';
import contentFilters from './slices/contentFilters';

export const store = configureStore({
    reducer: {
        contentFilters,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
