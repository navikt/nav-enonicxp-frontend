import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PageConfigState {
    pageId: string | null;
}

interface CurrentPageIdPayload {
    pageId: string;
}

const initialState: PageConfigState = {
    pageId: null,
};

export const pageConfigSlice = createSlice({
    name: 'pageConfig',
    initialState,
    reducers: {
        setPageConfig: (state, action: PayloadAction<CurrentPageIdPayload>) => {
            state.pageId = action.payload.pageId;
        },
    },
});

export const { setPageConfig: setPageConfigAction } = pageConfigSlice.actions;

export const currentPageId = (state: RootState): string => {
    return state.pageConfig.pageId;
};

export default pageConfigSlice.reducer;
