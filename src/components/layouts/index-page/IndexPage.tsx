import React, { useState } from 'react';
import { ContentType } from '../../../types/content-props/_content-common';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { IndexPageNavigation } from './navigation/IndexPageNavigation';
import { useRouter } from 'next/router';
import { fetchPageCacheContent } from '../../../utils/fetch/fetch-cache';
import { stripXpPathPrefix } from '../../../utils/urls';
import Head from 'next/head';
import { LayoutType } from '../../../types/component-props/layouts';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../types/content-props/index-pages-props';
import { getPageTitle } from '../../_common/metatags/HeadWithMetatags';

export type IndexPageContentProps = FrontPageProps | AreaPageProps;

type Props = {
    pageProps: IndexPageContentProps;
};

export const IndexPage = ({ pageProps }: Props) => {
    const router = useRouter();
    const [currentPageProps, setCurrentPageProps] = useState(pageProps);

    if (currentPageProps.page.descriptor !== LayoutType.IndexPage) {
        console.error('Invalid page type!');
        return null;
    }

    const { regions } = currentPageProps.page;
    if (!regions) {
        console.log('No regions found');
        return null;
    }

    const navigate = (path: string) => {
        router.push(stripXpPathPrefix(path), undefined, { shallow: true });
        fetchPageCacheContent(path).then((res) => {
            console.log(res);
            if (!res) {
                console.log('Fetch failed!');
                return;
            }

            if (
                res.__typename !== ContentType.AreaPage &&
                res.__typename !== ContentType.FrontPage
            ) {
                console.log('Invalid content type');
                return;
            }

            setCurrentPageProps(res);
        });
    };

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
