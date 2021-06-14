import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalValueItem } from '../../types/content-props/global-values-props';
import { GVMessageProps } from '../../components/pages/global-values-page/components/messages/GVMessages';

export type GvEditorState = {
    contentId: string;
    valueItems: GlobalValueItem[];
    messages: GVMessageProps[];
};

export type GvItemsPayload = Pick<GvEditorState, 'valueItems'>;

export type GvContentIdPayload = Pick<GvEditorState, 'contentId'>;

export type GvMessagesPayload = Pick<GvEditorState, 'messages'>;

const initialState: GvEditorState = {
    contentId: '',
    valueItems: [],
    messages: [],
};

const norwegianSort = new Intl.Collator(['no', 'nb', 'nn'], {
    usage: 'sort',
}).compare;

export const gvEditorStateSlice = createSlice({
    name: 'gvEditorState',
    initialState,
    reducers: {
        setValueItems: (state, action: PayloadAction<GvItemsPayload>) => {
            state.valueItems = action.payload.valueItems.sort((itemA, itemB) =>
                norwegianSort(
                    itemA.itemName.toLowerCase(),
                    itemB.itemName.toLowerCase()
                )
            );
        },
        setContentId: (state, action: PayloadAction<GvContentIdPayload>) => {
            state.contentId = action.payload.contentId;
        },
        setMessages: (state, action: PayloadAction<GvMessagesPayload>) => {
            state.messages = action.payload.messages;
        },
    },
});

export const {
    setValueItems: setValueItemsAction,
    setContentId: setContentIdAction,
    setMessages: setMessagesAction,
} = gvEditorStateSlice.actions;

export default gvEditorStateSlice.reducer;
