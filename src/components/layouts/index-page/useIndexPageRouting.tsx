import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { IndexPageContentProps } from './IndexPage';
import { getPublicPathname } from '../../../utils/urls';
import { fetchPageCacheContent } from '../../../utils/fetch/fetch-cache-content';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';

type CacheEntries = Record<string, IndexPageContentProps>;

const IndexPageRoutingContext = React.createContext<(path: string) => void>(
    (path: string) => {
        console.log('IndexPage navigation not enabled');
    }
);

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

    const router = useRouter();

    const [currentPageProps, setCurrentPageProps] = useState(pageProps);
    const [localPageCache, setLocalPageCache] = useState<CacheEntries>({
        [basePath]: pageProps,
    });

    const addLocalPageCacheEntries = (cacheEntries: CacheEntries) => {
        setLocalPageCache({ ...localPageCache, ...cacheEntries });
    };

    const navigate = (path: string) => {
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
    };

    // Prefetch all referenced pages
    useEffect(() => {
        Promise.all<ContentProps | null>(
            currentPageProps.data.areasRefs.map((areaContent) => {
                const path = getPublicPathname(areaContent);
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
    }, [currentPageProps]);

    // Handle back/forward navigation in the browser
    useEffect(() => {
        router.beforePopState(({ url, as, options }) => {
            navigate(as);

            return false;
        });

        return () => {
            router.beforePopState(undefined);
        };
    }, [router, localPageCache]);

    // Handle regular next.js routing to the initial page
    useEffect(() => {
        const handler = (url, { shallow }) => {
            if (url === basePath && !shallow) {
                navigate(url);
            }
        };

        router.events.on('routeChangeComplete', handler);
        return () => {
            router.events.off('routeChangeComplete', handler);
        };
    }, [pageProps]);

    return {
        currentPageProps,
        IndexPageRoutingProvider: IndexPageRoutingContext.Provider,
        navigate,
    };
};

export const useIndexPageNavigation = () => {
    const navigate = useContext(IndexPageRoutingContext);

    return navigate;
};
