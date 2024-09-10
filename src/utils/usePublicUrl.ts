import { usePageContentProps } from 'store/pageContext';
import {
    getInternalRelativePath,
    isAppUrl,
    isXpUrl,
    stripXpPathPrefix,
    transformToXpLayerUrl,
} from './urls';

type ReturnValue = {
    url: string;
    canRouteClientSide: boolean; // If true, navigation to the url can be done client-side with next router
};

export const usePublicUrl = (href: string): ReturnValue => {
    const { editorView, language } = usePageContentProps();

    if (isXpUrl(href)) {
        return {
            url: transformToXpLayerUrl(href, !!editorView, language),
            canRouteClientSide: false,
        };
    }

    if (isAppUrl(href)) {
        const internalPath = getInternalRelativePath(href, !!editorView);
        return {
            url: internalPath,
            canRouteClientSide: true,
        };
    }

    return {
        url: stripXpPathPrefix(href) || '/',
        canRouteClientSide: false,
    };
};
