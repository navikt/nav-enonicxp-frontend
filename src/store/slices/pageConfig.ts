import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language } from 'translations';
import type { RootState } from '../store';
import { ContentProps } from 'types/content-props/_content-common';
import { Audience } from 'types/component-props/_mixins';

type EditorView = ContentProps['editorView'];

interface PageConfigState {
    pageId: string;
    language: Language;
    editorView?: EditorView;
    isPagePreview?: boolean;
    audience?: Audience;
}

export interface CurrentPageIdPayload {
    pageId: string;
    language: Language;
    editorView?: EditorView;
    isPagePreview?: boolean;
    audience?: Audience;
}

const initialState: PageConfigState = {
    pageId: '',
    language: 'no',
    isPagePreview: false,
    audience: undefined,
};

export const pageConfigSlice = createSlice({
    name: 'pageConfig',
    initialState,
    reducers: {
        setPageConfig: (state, action: PayloadAction<CurrentPageIdPayload>) => {
            state.pageId = action.payload.pageId;
            state.language = action.payload.language;
            state.editorView = action.payload.editorView;
            state.isPagePreview = action.payload.isPagePreview;
            state.audience = action.payload.audience;
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

export const currentEditorView = (state: RootState): EditorView => {
    return state.pageConfig.editorView;
};

export const isPagePreview = (
    state: RootState
): PageConfigState['isPagePreview'] => {
    return state.pageConfig.isPagePreview;
};

export const pageAudience = (state: RootState): Audience | undefined => {
    return state.pageConfig.audience;
};

export default pageConfigSlice.reducer;
