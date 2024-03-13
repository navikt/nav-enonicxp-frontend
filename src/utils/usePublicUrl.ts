import {
    getInternalRelativePath,
    isAppUrl,
    isInternalUrl,
    stripXpPathPrefix,
} from './urls';
import { usePageContext } from 'store/pageContext';

type ReturnValue = {
    url: string;
    canRouteClientSide: boolean; // If this is true, navigation to the url can be done client-side with next router
};

export const usePublicUrl = (href: string): ReturnValue => {
    const { editorView } = usePageContext();

    if (isInternalUrl(href)) {
        const internalPath = getInternalRelativePath(href, !!editorView);
        return {
            url: internalPath,
            canRouteClientSide: isAppUrl(internalPath),
        };
    }

    return { url: stripXpPathPrefix(href) || '/', canRouteClientSide: false };
};
