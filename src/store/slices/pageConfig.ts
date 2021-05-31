import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from 'translations';
import type { RootState } from '../store';

interface PageConfigState {
    pageId: string | null;
    language: Language;
}

interface CurrentPageIdPayload {
    pageId: string;
    language: 'no';
}

const initialState: PageConfigState = {
    pageId: null,
    language: 'no',
};

export const pageConfigSlice = createSlice({
    name: 'pageConfig',
    initialState,
    reducers: {
        setPageConfig: (state, action: PayloadAction<CurrentPageIdPayload>) => {
            state.pageId = action.payload.pageId;
            state.language = action.payload.language;
        },
    },
});

export const { setPageConfig: setPageConfigAction } = pageConfigSlice.actions;

export const currentPageId = (state: RootState): string => {
    return state.pageConfig.pageId;
};

export const currentLanguage = (state: RootState): Language => {
    return state.pageConfig.language;
};

export default pageConfigSlice.reducer;
