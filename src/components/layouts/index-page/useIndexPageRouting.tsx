import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IndexPageContentProps } from './IndexPage';
import { getPublicPathname } from '../../../utils/urls';
import { fetchPageCacheContent } from '../../../utils/fetch/fetch-cache';
import { ContentType } from '../../../types/content-props/_content-common';

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
    const router = useRouter();
    const [currentPageProps, setCurrentPageProps] = useState(pageProps);
    const [localPageCache, setLocalPageCache] = useState({});

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

    useEffect(() => {
        currentPageProps.data.areasRefs.forEach((ref) => {
            const path = getPublicPathname(ref);
            if (!localPageCache[path]) {
                fetchIndexPageContentProps(path).then((res) => {
                    console.log(`Fetched and cached ${path}`);
                    setLocalPageCache({ ...localPageCache, [path]: res });
                });
            }
        });
    }, [currentPageProps]);

    return { currentPageProps, navigate };
};
