import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { IndexPageContentProps } from './IndexPage';
import { getPublicPathname, xpDraftPathPrefix } from '../../../utils/urls';
import { fetchPageCacheContent } from '../../../utils/fetch/fetch-cache-content';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

type CacheEntries = Record<string, IndexPageContentProps>;

type IndexPageRoutingContext = {
    indexPages: Set<string>;
    navigate: (path: string) => void;
};

const IndexPageRoutingContext = React.createContext<IndexPageRoutingContext>({
    indexPages: new Set(),
    navigate: (_: string) => {},
});

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
    const indexPages = new Set([basePath, ...areasRefsPaths]);

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

    const navigate = useCallback(
        (path: string) => {
            if (editorView) {
                router.push(`${xpDraftPathPrefix}${path}`);
                return;
            }

            const cachedPage = localPageCache[path];

            if (cachedPage) {
                setCurrentPageProps(cachedPage);
            } else {
                fetchIndexPageContentProps(path).then((contentProps) => {
                    addLocalPageCacheEntries({
                        ...localPageCache,
                        [path]: contentProps,
                    });
                    setCurrentPageProps(contentProps);
                });
            }

            router.push(path, undefined, { shallow: true });
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

            addLocalPageCacheEntries({ ...localPageCache, ...pages });
        });
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
        const handler = (url, { shallow }) => {
            if (!shallow) {
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

export const useIndexPageNavigation = () => {
    return useContext(IndexPageRoutingContext);
};
