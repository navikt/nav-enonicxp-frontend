import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalValueItem } from '../../types/content-props/global-values-props';
import { GVMessageProps } from '../../components/_editor/global-values-page/components/messages/GVMessages';

export type GvEditorState = {
    contentId: string;
    valueItems: GlobalValueItem[];
    messages: GVMessageProps[];
    itemsEditState: { [key: string]: boolean };
};

export type GvItemsPayload = Pick<GvEditorState, 'valueItems'>;

export type GvContentIdPayload = Pick<GvEditorState, 'contentId'>;

export type GvMessagesPayload = Pick<GvEditorState, 'messages'>;

export type GvItemStatePayload = { key: string; isEditMode: boolean };

const initialState: GvEditorState = {
    contentId: '',
    valueItems: [],
    messages: [],
    itemsEditState: {},
};

export const gvEditorStateSlice = createSlice({
    name: 'gvEditorState',
    initialState,
    reducers: {
        setValueItems: (state, action: PayloadAction<GvItemsPayload>) => {
            state.valueItems = action.payload.valueItems;
        },
        setContentId: (state, action: PayloadAction<GvContentIdPayload>) => {
            state.contentId = action.payload.contentId;
        },
        setMessages: (state, action: PayloadAction<GvMessagesPayload>) => {
            state.messages = action.payload.messages;
        },
        setItemEditState: (
            state,
            action: PayloadAction<GvItemStatePayload>
        ) => {
            state.itemsEditState[action.payload.key] =
                action.payload.isEditMode;
        },
    },
});

export const {
    setValueItems: setValueItemsAction,
    setContentId: setContentIdAction,
    setMessages: setMessagesAction,
    setItemEditState: setItemEditStateAction,
} = gvEditorStateSlice.actions;

export default gvEditorStateSlice.reducer;
