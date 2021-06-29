import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    setPageConfigAction,
    currentPageId,
    currentLanguage,
    currentEditorView,
} from '../slices/pageConfig';
import { Language } from 'translations';
import { ContentProps } from '../../types/content-props/_content-common';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type PageConfig = {
    pageId: string;
    editorView: ContentProps['editorView'];
};

type UsePageConfig = {
    pageConfig: PageConfig;
    setPageConfig: (payload: any) => void;
    language: Language;
};

export const usePageConfig = (): UsePageConfig => {
    const dispatch = useAppDispatch();

    const pageId = useAppSelector<string>((state) => currentPageId(state));
    const language = useAppSelector<Language>((state) =>
        currentLanguage(state)
    );
    const editorView = useAppSelector((state) => currentEditorView(state));

    const setPageConfig = (payload) => {
        dispatch(setPageConfigAction(payload));
    };

    const pageConfig = {
        pageId,
        editorView,
    };

    return { pageConfig, setPageConfig, language };
};
