import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { GvState, GvDispatch } from './gvEditorStore';
import {
    GvEditorState,
    setMessagesAction,
    setValueItemsAction,
} from './gvEditorState';
import { GlobalValueItem } from '../../../../types/content-props/global-values-props';
import { GVMessageProps } from '../components/messages/GVMessages';

export const useAppDispatch = () => useDispatch<GvDispatch>();
export const useAppSelector: TypedUseSelectorHook<GvState> = useSelector;

export const useGvEditorState = () => {
    const dispatch = useAppDispatch();

    const { contentId, valueItems, messages } = useAppSelector<GvEditorState>(
        (state) => state.gvEditorState
    );

    const setValueItems = (valueItems: GlobalValueItem[]) => {
        dispatch(setValueItemsAction({ valueItems }));
    };

    const setMessages = (messages: GVMessageProps[]) => {
        dispatch(setMessagesAction({ messages }));
    };

    return { contentId, valueItems, messages, setValueItems, setMessages };
};
