import { internalPathToCustomPath } from '../slices/pathMap';
import { useAppSelector } from './usePageConfig';

export const usePathMap = () => {
    const internalPathToCustomPathSelector = useAppSelector((state) =>
        internalPathToCustomPath(state)
    );

    return {
        internalPathToCustomPath: internalPathToCustomPathSelector,
    };
};
