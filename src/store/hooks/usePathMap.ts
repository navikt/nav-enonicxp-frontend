import { internalPathToCustomPathSelector } from '../slices/pathMap';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const usePathMap = () => {
    const internalPathToCustomPath = useSelector<RootState>((state) =>
        internalPathToCustomPathSelector(state)
    );

    return {
        internalPathToCustomPath,
    };
};
