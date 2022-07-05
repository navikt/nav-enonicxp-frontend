import { getInternalRelativePath, isAppUrl } from './urls';
import { NextRouter } from 'next/router';

const elementIsAnchor = (element: HTMLElement): element is HTMLAnchorElement =>
    element.tagName?.toLowerCase() === 'a';

const getLinkHref = (element: HTMLElement | null): string | null => {
    if (!element) {
        return null;
    }
    if (elementIsAnchor(element)) {
        return !element.href || element.href.includes('#')
            ? null
            : element.href;
    }
    return getLinkHref(element.parentElement);
};

export const hookAndInterceptInternalLink =
    (router: NextRouter) => (e: MouseEvent) => {
        const href = getLinkHref(e.target as HTMLElement);
        if (isAppUrl(href)) {
            e.preventDefault();
            const path = getInternalRelativePath(href);
            router.push(path);
        }
    };

export const prefetchOnMouseover = (router: NextRouter) => (e: MouseEvent) => {
    const href = getLinkHref(e.target as HTMLElement);
    if (isAppUrl(href)) {
        const path = new URL(href).pathname;
        router.prefetch(path);
    }
};
