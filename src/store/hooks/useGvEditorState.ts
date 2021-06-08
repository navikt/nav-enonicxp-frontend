import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    GvEditorState,
    setMessagesAction,
    setValueItemsAction,
} from '../slices/gvEditorState';
import { GlobalValueItem } from '../../types/content-props/global-values-props';
import { GVMessageProps } from '../../components/pages/global-values-page/components/messages/GVMessages';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

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
