import { configureStore } from '@reduxjs/toolkit';
import gvEditorState from './gvEditorState';

export const gvEditorStore = configureStore({
    reducer: {
        gvEditorState,
    },
});

export type GvState = ReturnType<typeof gvEditorStore.getState>;
export type GvDispatch = typeof gvEditorStore.dispatch;
