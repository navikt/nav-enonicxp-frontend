import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { swapKeysAndValues } from '../../utils/objects';

type PathMap = { [key: string]: string };

type PathMapState = {
    isInitialState: boolean;
    internalPathToCustomPath: PathMap;
    customPathToInternalPath: PathMap;
};

type PathMapPayload = {
    internalPathToCustomPath: PathMap;
};

const initialState: PathMapState = {
    isInitialState: true,
    internalPathToCustomPath: {},
    customPathToInternalPath: {},
};

export const pathMapSlice = createSlice({
    name: 'pathMap',
    initialState,
    reducers: {
        setPathMap: (state, action: PayloadAction<PathMapPayload>) => {
            state.isInitialState = false;
            state.internalPathToCustomPath =
                action.payload.internalPathToCustomPath;
            state.customPathToInternalPath = swapKeysAndValues(
                action.payload.internalPathToCustomPath
            );
        },
    },
});

export const internalPathToCustomPath = (state: RootState) => {
    return state.pathMap.internalPathToCustomPath;
};

export const customPathToInternalPath = (state: RootState) => {
    return state.pathMap.customPathToInternalPath;
};

export const isInitialState = (state: RootState) => {
    return state.pathMap.isInitialState;
};

export default pathMapSlice.reducer;
