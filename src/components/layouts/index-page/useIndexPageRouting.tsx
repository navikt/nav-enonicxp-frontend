import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IndexPageContentProps } from './IndexPage';
import { getPublicPathname } from '../../../utils/urls';
import { fetchPageCacheContent } from '../../../utils/fetch/fetch-cache';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';

const fetchIndexPageContentProps = (path: string) =>
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

export const useIndexPageRouting = (pageProps: IndexPageContentProps) => {
    const basePath = getPublicPathname(pageProps);

    const router = useRouter();
    const [currentPageProps, setCurrentPageProps] = useState(pageProps);
    const [localPageCache, setLocalPageCache] = useState({
        [basePath]: pageProps,
    });

    const navigate = (path: string) => {
        const cachedPage = localPageCache[path];

        if (cachedPage) {
            setCurrentPageProps(cachedPage);
        } else {
            fetchIndexPageContentProps(path).then((contentProps) => {
                setLocalPageCache({ ...localPageCache, [path]: contentProps });
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

            setLocalPageCache({ ...localPageCache, ...pages });
        });
    }, [currentPageProps]);

    // Handle back/forwards navigation in the browser
    useEffect(() => {
        router.beforePopState(({ url, as, options }) => {
            const cachedPage = localPageCache[as];

            if (cachedPage) {
                console.log(`Found cached page for ${as}`);
                setCurrentPageProps(cachedPage);
                return false;
            }

            console.log(`${as} is not cached`);
            return true;
        });
    }, [router, localPageCache]);

    return { currentPageProps, navigate };
};
