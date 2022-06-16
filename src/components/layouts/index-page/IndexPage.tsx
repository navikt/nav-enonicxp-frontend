import React from 'react';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import { IndexPageNavigation } from './navigation/IndexPageNavigation';
import Head from 'next/head';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../types/content-props/index-pages-props';
import { getPageTitle } from '../../_common/metatags/HeadWithMetatags';
import { useIndexPageRouting } from './useIndexPageRouting';

export type IndexPageContentProps = FrontPageProps | AreaPageProps;

type Props = {
    pageProps: IndexPageContentProps;
};

export const IndexPage = ({ pageProps }: Props) => {
    const { currentPageProps, navigate } = useIndexPageRouting(pageProps);

    const { regions } = currentPageProps.page;

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
