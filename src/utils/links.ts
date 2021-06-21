import { getInternalRelativePath, isAppUrl, isNavUrl } from './urls';
import { NextRouter } from 'next/router';
import { parseDomain, ParseResultType } from 'parse-domain';

const absoluteUrlPrefix = new RegExp(/^https?:\/\//i);

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

export const getExternalDomain = (url: string) => {
    if (isNavUrl(url) || !url?.match(absoluteUrlPrefix)) {
        return '';
    }

    const hostname = url.replace(absoluteUrlPrefix, '').split('/')[0];
    const parseResult = parseDomain(hostname);

    if (parseResult.type === ParseResultType.Listed) {
        const { domain, topLevelDomains } = parseResult;
        return [domain, ...topLevelDomains].join('.');
    }

    return '';
};
