import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PathMap } from '../../types/content-props/_content-common';

export type PathMapState = {
    internalPathToCustomPath: PathMap;
};

const initialState: PathMapState = {
    internalPathToCustomPath: {},
};

export const pathMapSlice = createSlice({
    name: 'pathMap',
    initialState,
    reducers: {
        setPathMap: (state, action: PayloadAction<PathMap>) => {
            if (action.payload) {
                state.internalPathToCustomPath = action.payload;
            }
        },
    },
});

export const { setPathMap: setPathMapAction } = pathMapSlice.actions;

export const internalPathToCustomPath = (state: RootState) => {
    return state.pathMap.internalPathToCustomPath;
};

export default pathMapSlice.reducer;
