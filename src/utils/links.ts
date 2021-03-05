import { getInternalRelativePath, isInternalUrl } from './urls';
import { NextRouter } from 'next/router';
import globalState from '../globalState';

const getLinkHref = (element: HTMLElement | null): string | null => {
    if (!element) {
        return null;
    }
    if (element.tagName?.toLowerCase() === 'a') {
        return (element as HTMLAnchorElement).href;
    }
    return getLinkHref(element.parentElement);
};

export const hookAndInterceptInternalLink = (router: NextRouter) => (
    e: MouseEvent
) => {
    const href = getLinkHref(e.target as HTMLElement);
    if (isInternalUrl(href)) {
        e.preventDefault();
        const path = getInternalRelativePath(href, globalState.isDraft);
        router
            .push(path)
            .then(() =>
                document?.getElementById('top-element')?.scrollIntoView()
            );
    }
};

export const prefetchOnMouseover = (router: NextRouter) => (e: MouseEvent) => {
    const href = getLinkHref(e.target as HTMLElement);
    if (isInternalUrl(href)) {
        const path = new URL(href).pathname;
        router.prefetch(path);
    }
};
