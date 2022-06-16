import React, { useEffect, useState } from 'react';
import { ContentType } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { IndexPageNavigation } from './navigation/IndexPageNavigation';
import { useRouter } from 'next/router';
import { fetchPageCacheContent } from '../../../utils/fetch/fetch-cache';
import { getPublicPathname } from '../../../utils/urls';
import Head from 'next/head';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../types/content-props/index-pages-props';
import { getPageTitle } from '../../_common/metatags/HeadWithMetatags';

export type IndexPageContentProps = FrontPageProps | AreaPageProps;

const fetchPageProps = (path: string) =>
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

type Props = {
    pageProps: IndexPageContentProps;
};

export const IndexPage = ({ pageProps }: Props) => {
    const router = useRouter();
    const [currentPageProps, setCurrentPageProps] = useState(pageProps);
    const [localPageCache, setLocalPageCache] = useState({});

    const { regions } = currentPageProps.page;

    const navigate = (path: string) => {
        router.push(path, undefined, { shallow: true });

        const cachedPage = localPageCache[path];
        if (cachedPage) {
            setCurrentPageProps(cachedPage);
            return;
        }

        fetchPageProps(path).then((res) => {
            setLocalPageCache({ ...localPageCache, [path]: res });
            setCurrentPageProps(res);
        });
    };

    useEffect(() => {
        currentPageProps.data.areasRefs.forEach((ref) => {
            const path = getPublicPathname(ref);
            if (!localPageCache[path]) {
                fetchPageProps(path).then((res) => {
                    console.log(`Fetched and cached ${path}`);
                    setLocalPageCache({ ...localPageCache, [path]: res });
                });
            }
        });
    }, [currentPageProps]);

    return (
        <LayoutContainer
            pageProps={currentPageProps}
            layoutProps={currentPageProps.page}
        >
            <Head>
                <title>{getPageTitle(currentPageProps)}</title>
            </Head>
            <Region
                pageProps={currentPageProps}
                regionProps={regions.contentTop}
            />
            <IndexPageNavigation
                pageProps={currentPageProps}
                navigationCallback={navigate}
            />
            <Region
                pageProps={currentPageProps}
                regionProps={regions.contentBottom}
            />
        </LayoutContainer>
    );
};
