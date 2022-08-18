import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
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

// 18/08/22: In relation with quick fix for checking if browser is
// safari before calling navigate on beforePopState.
declare global {
    interface Window {
        safari: any;
    }
}

export type IndexPageNavigationCallback = (path: string) => void;

const fetchPageContentProps = (
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
            // Could be the case if user navigates via next/prev buttons
            // in browser, which will still trigger call to navigation.
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
                // 18.08.22: There is a quirk seemingly with Safari bfcache where
                // links that redirect seem to get stuck in the redirect loop when clicking back button.
                // Setting shallow depending on Safari seems to fix the symptoms for now.
                const shallow = !!window.safari;
                router.push(path, undefined, { shallow });
                return;
            }

            fetchPageContentProps(path).then((contentProps) => {
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

                return fetchPageContentProps(path);
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
        const handler = (url: string, { shallow }) => {
            // Pushing a route non-shallow will send the browser into a loop,
            // so check that the paths are actually dissimilar.
            const currentPath = window.location.pathname;
            if (!shallow && currentPath !== url) {
                navigate(url);
            }
        };

        router.events.on('routeChangeComplete', handler);
        return () => {
            router.events.off('routeChangeComplete', handler);
        };
    }, [navigate, router, basePath]);

    return {
        currentPageProps,
        navigate,
    };
};
