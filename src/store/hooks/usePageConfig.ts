import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setPageConfigAction, currentPageId } from '../slices/pageConfig';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type PageConfig = {
    pageId: string;
};

type UseFilterState = {
    pageConfig: PageConfig;
    setPageConfig: (payload: any) => void;
};

export const usePageConfig = (): UseFilterState => {
    const dispatch = useAppDispatch();

    const pageId = useAppSelector<string>((state) => currentPageId(state));

    const setPageConfig = (payload) => {
        dispatch(setPageConfigAction(payload));
    };

    const pageConfig = {
        pageId,
    };

    return { pageConfig, setPageConfig };
};
