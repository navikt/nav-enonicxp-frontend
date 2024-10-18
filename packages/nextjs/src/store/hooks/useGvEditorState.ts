import { useAppDispatch, useAppSelector } from 'store/store';
import {
    GvEditorState,
    setItemEditStateAction,
    setMessagesAction,
    setValueItemsAction,
} from 'store/slices/gvEditorState';
import { GlobalValueItem } from 'types/content-props/global-values-props';
import { GVMessageProps } from '@/editor-tools/pages/global-values-page/components/messages/GVMessages';

type UseGvEditorState = {
    contentId: string;
    valueItems: GlobalValueItem[];
    messages: GVMessageProps[];
    setValueItems: (valueItems: GlobalValueItem[]) => void;
    setMessages: (messages: GVMessageProps[]) => void;
    itemsEditState: { [key: string]: boolean };
    setItemEditState: (key: string, isEditMode: boolean) => void;
    editorEnabled: boolean;
};

export const useGvEditorState = () => {
    const dispatch = useAppDispatch();

    const { contentId, valueItems, messages, itemsEditState, editorEnabled } =
        useAppSelector<GvEditorState>((state) => state.gvEditorState);

    const setValueItems = (valueItems: GlobalValueItem[]) => {
        dispatch(setValueItemsAction({ valueItems }));
    };

    const setMessages = (messages: GVMessageProps[]) => {
        dispatch(setMessagesAction({ messages }));
    };

    const setItemEditState = (key: string, isEditMode: boolean) => {
        dispatch(setItemEditStateAction({ key, isEditMode }));
    };

    return {
        contentId,
        valueItems,
        messages,
        setValueItems,
        setMessages,
        itemsEditState,
        setItemEditState,
        editorEnabled,
    };
};
