import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { swapKeysAndValues } from '../../utils/objects';
import { PathMap } from '../../types/content-props/_content-common';

export type PathMapState = {
    internalPathToCustomPath: PathMap;
    customPathToInternalPath: PathMap;
};
const initialState: PathMapState = {
    internalPathToCustomPath: {},
    customPathToInternalPath: {},
};

export const pathMapSlice = createSlice({
    name: 'pathMap',
    initialState,
    reducers: {
        setPathMap: (state, action: PayloadAction<PathMap>) => {
            if (action.payload) {
                state.internalPathToCustomPath = action.payload;
                state.customPathToInternalPath = swapKeysAndValues(
                    action.payload
                );
            }
        },
    },
});

export const { setPathMap: setPathMapAction } = pathMapSlice.actions;

export const internalPathToCustomPath = (state: RootState) => {
    return state.pathMap.internalPathToCustomPath;
};

export const customPathToInternalPath = (state: RootState) => {
    return state.pathMap.customPathToInternalPath;
};

export default pathMapSlice.reducer;
