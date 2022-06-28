import { usePathMap } from '../store/hooks/usePathMap';
import {
    getInternalRelativePath,
    isInternalUrl,
    stripXpPathPrefix,
} from './urls';

export const usePublicHref = (href: string) => {
    const { internalPathToCustomPath } = usePathMap();

    if (isInternalUrl(href)) {
        const internalPath = getInternalRelativePath(href);
        return internalPathToCustomPath[internalPath] || internalPath;
    }

    return stripXpPathPrefix(href) || '/';
};
