import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { LayoutType } from 'types/component-props/layouts';

export interface LayoutConfigState {
    type: LayoutType;
    title?: string;
}

const initialState: LayoutConfigState = {
    type: null,
};

export const layoutConfigSlice = createSlice({
    name: 'layoutConfig',
    initialState,
    reducers: {
        setLayoutConfig: (state, action: PayloadAction<LayoutConfigState>) => {
            state.type = action.payload.type;
            state.title = action.payload.title;
        },
    },
});

export const { setLayoutConfig: setLayoutConfigAction } = layoutConfigSlice.actions;

export const currentLayout = (state: RootState): LayoutType => {
    return state.layoutConfig.type;
};

export const currentLayoutTitle = (state: RootState): string => {
    return state.layoutConfig.title;
};

export default layoutConfigSlice.reducer;
