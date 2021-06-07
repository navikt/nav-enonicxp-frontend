import { useAppSelector } from './usePageConfig';
import { internalPathToCustomPathSelector } from '../slices/pathMap';

export const usePathMap = () => {
    const internalPathToCustomPath = useAppSelector((state) =>
        internalPathToCustomPathSelector(state)
    );

    return {
        internalPathToCustomPath,
    };
};
