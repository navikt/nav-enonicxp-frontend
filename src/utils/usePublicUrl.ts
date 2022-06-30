import { usePathMap } from '../store/hooks/usePathMap';
import {
    getInternalRelativePath,
    isAppUrl,
    isInternalUrl,
    stripXpPathPrefix,
} from './urls';

type ReturnValue = {
    url: string;
    canRouteClientSide: boolean; // If this is true, navigation to the url can be done client-side with next router
};

export const usePublicUrl = (href: string): ReturnValue => {
    const { internalPathToCustomPath } = usePathMap();

    if (isInternalUrl(href)) {
        const internalPath = getInternalRelativePath(href);
        return {
            url: internalPathToCustomPath[internalPath] || internalPath,
            canRouteClientSide: isAppUrl(internalPath),
        };
    }

    return { url: stripXpPathPrefix(href) || '/', canRouteClientSide: false };
};
