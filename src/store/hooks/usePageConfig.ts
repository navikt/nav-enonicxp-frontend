import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    setPageConfigAction,
    currentPageId,
    currentLanguage,
} from '../slices/pageConfig';
import { Language } from 'translations';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type PageConfig = {
    pageId: string;
};

type UseFilterState = {
    pageConfig: PageConfig;
    setPageConfig: (payload: any) => void;
    language: Language;
};

export const usePageConfig = (): UseFilterState => {
    const dispatch = useAppDispatch();

    const pageId = useAppSelector<string>((state) => currentPageId(state));
    const language = useAppSelector<Language>((state) =>
        currentLanguage(state)
    );

    const setPageConfig = (payload) => {
        dispatch(setPageConfigAction(payload));
    };

    const pageConfig = {
        pageId,
    };

    return { pageConfig, setPageConfig, language };
};
