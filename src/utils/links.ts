import { getInternalRelativePath, isAppUrl } from './urls';
import { NextRouter } from 'next/router';

const getLinkHref = (element: HTMLElement | null): string | null => {
    if (!element) {
        return null;
    }
    if (element.tagName?.toLowerCase() === 'a') {
        return (element as HTMLAnchorElement).href;
    }
    return getLinkHref(element.parentElement);
};

export const hookAndInterceptInternalLink =
    (router: NextRouter) => (e: MouseEvent) => {
        const href = getLinkHref(e.target as HTMLElement);
        if (isAppUrl(href)) {
            e.preventDefault();
            const path = getInternalRelativePath(href);
            router
                .push(path)
                .then(() =>
                    document?.getElementById('top-element')?.scrollIntoView()
                );
        }
    };

export const prefetchOnMouseover = (router: NextRouter) => (e: MouseEvent) => {
    const href = getLinkHref(e.target as HTMLElement);
    if (isAppUrl(href)) {
        const path = new URL(href).pathname;
        router.prefetch(path);
    }
};
