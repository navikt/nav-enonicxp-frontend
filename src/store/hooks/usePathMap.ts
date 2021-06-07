import {
    internalPathToCustomPath,
    customPathToInternalPath,
} from '../slices/pathMap';
import { useAppSelector } from './usePageConfig';

export const usePathMap = () => {
    const internalPathToCustomPathSelector = useAppSelector((state) =>
        internalPathToCustomPath(state)
    );

    const customPathToInternalPathSelector = useAppSelector((state) =>
        customPathToInternalPath(state)
    );

    return {
        internalPathToCustomPath: internalPathToCustomPathSelector,
        customPathToInternalPath: customPathToInternalPathSelector,
    };
};
