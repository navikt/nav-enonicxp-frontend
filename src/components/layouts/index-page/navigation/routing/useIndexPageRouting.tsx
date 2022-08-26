import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IndexPageContentProps } from '../../IndexPage';
import {
    getPublicPathname,
    xpDraftPathPrefix,
} from '../../../../../utils/urls';
import { fetchPageCacheContent } from '../../../../../utils/fetch/fetch-cache-content';
import {
    ContentProps,
    ContentType,
} from '../../../../../types/content-props/_content-common';
import { usePageConfig } from '../../../../../store/hooks/usePageConfig';

type CacheEntries = Record<string, IndexPageContentProps>;

export type IndexPageNavigationCallback = (path: string) => void;

const fetchIndexPageContentProps = (
    path: string
): Promise<IndexPageContentProps | null> =>
    fetchPageCacheContent(path).then((res) => {
        if (!res) {
            return null;
        }

        if (
            res.__typename !== ContentType.AreaPage &&
            res.__typename !== ContentType.FrontPage
        ) {
            console.error('Invalid content type for this page');
            return null;
        }

        return res;
    });

// Custom routing functionality for navigating between frontpages and area pages. We want to control routing
// between these pages in order to implement various shiny transition effects :D
export const useIndexPageRouting = (pageProps: IndexPageContentProps) => {
    const basePath = getPublicPathname(pageProps);
    const areasRefsPaths = pageProps.data.areasRefs.map((ref) =>
        getPublicPathname(ref)
    );

    const router = useRouter();
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    const [currentPageProps, setCurrentPageProps] = useState(pageProps);
    const [localPageCache, setLocalPageCache] = useState<CacheEntries>({
        [basePath]: pageProps,
    });

    const addLocalPageCacheEntries = useCallback(
        (cacheEntries: CacheEntries) => {
            setLocalPageCache({ ...localPageCache, ...cacheEntries });
        },
        [localPageCache]
    );

    const navigate: IndexPageNavigationCallback = useCallback(
        (path: string) => {
            if (editorView) {
                router.push(`${xpDraftPathPrefix}${path}`);
                return;
            }

            const cachedPage = localPageCache[path];

            if (cachedPage) {
                setCurrentPageProps(cachedPage);
                router.push(path, undefined, { shallow: true });
                return;
            }

            fetchIndexPageContentProps(path).then((contentProps) => {
                if (!contentProps) {
                    router.push(path);
                    return;
                }

                addLocalPageCacheEntries({
                    [path]: contentProps,
                });
                setCurrentPageProps(contentProps);

                router.push(path, undefined, { shallow: true });
            });
        },
        [localPageCache, router, editorView, addLocalPageCacheEntries]
    );

    // Prefetch all referenced pages
    useEffect(() => {
        Promise.all<ContentProps | null>(
            areasRefsPaths.map((path) => {
                if (localPageCache[path]) {
                    return null;
                }

                return fetchIndexPageContentProps(path);
            })
        ).then((res) => {
            const pages = res.reduce((acc, page) => {
                if (!page) {
                    return acc;
                }

                const path = getPublicPathname(page);

                return { ...acc, [path]: page };
            }, {});

            addLocalPageCacheEntries(pages);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle back/forward navigation in the browser
    useEffect(() => {
        router.beforePopState(({ as }) => {
            navigate(as);
            return false;
        });

        return () => {
            router.beforePopState(undefined);
        };
    }, [navigate, router]);

    // Handle regular next.js routing to the initial page
    useEffect(() => {
        const handler = (url) => {
            if (url !== router.asPath) {
                return;
            }

            const cachedPage = localPageCache[url];
            if (cachedPage) {
                setCurrentPageProps(cachedPage);
                return;
            }

            fetchIndexPageContentProps(url).then((contentProps) => {
                if (contentProps) {
                    setCurrentPageProps(contentProps);
                }
            });
        };

        router.events.on('routeChangeComplete', handler);
        return () => {
            router.events.off('routeChangeComplete', handler);
        };
    }, [router, basePath, localPageCache]);

    return {
        currentPageProps,
        navigate,
    };
};
