import { useAppDispatch, useAppSelector } from '../store';
import {
    LayoutConfigState,
    currentLayout,
    currentLayoutTitle,
    setLayoutConfigAction
} from '../slices/layoutConfig';
import { LayoutType } from '../../types/component-props/layouts';

type UseLayoutConfig = {
    layoutConfig: LayoutConfigState;
    setLayoutConfig: (payload: any) => void;
};

export const useLayoutConfig = (): UseLayoutConfig => {
    const dispatch = useAppDispatch();
    const type = useAppSelector<LayoutType>((state) => currentLayout(state));
    const title = useAppSelector<string>((state) => currentLayoutTitle(state));

    const setLayoutConfig = (payload) => {
        dispatch(setLayoutConfigAction(payload));
    };

    const layoutConfig = {
        type,
        title,
    };

    return { layoutConfig, setLayoutConfig };
};
