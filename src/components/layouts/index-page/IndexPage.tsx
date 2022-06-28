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
import { useIndexPageRouting } from './navigation/routing/useIndexPageRouting';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { LenkeInline } from '../../_common/lenke/LenkeInline';
import { AnimateHeight } from '../../_common/animate-height/AnimateHeight';
import { IndexPageTemplate } from './IndexPageTemplate';
import { store } from '../../../store/store';
import { setPathMapAction } from '../../../store/slices/pathMap';

import style from './IndexPage.module.scss';

export type IndexPageContentProps = FrontPageProps | AreaPageProps;

const IndexPageContent = (basePageProps: IndexPageContentProps) => {
    const { currentPageProps, navigate } = useIndexPageRouting(basePageProps);

    const { __typename, _id, page, pathMap } = currentPageProps;
    const { regions } = page;

    store.dispatch(setPathMapAction(pathMap));

    return (
        <LayoutContainer
            pageProps={currentPageProps}
            layoutProps={page}
            className={style.indexPage}
        >
            <Head>
                <title>{getPageTitle(currentPageProps)}</title>
                {/*TODO: Remove this before public release*/}
                {!currentPageProps.data?.customPath && (
                    <meta name={'robots'} content={'noindex, nofollow'} />
                )}
            </Head>
            <AnimateHeight trigger={_id}>
                {__typename === ContentType.FrontPage && (
                    <Region
                        pageProps={currentPageProps}
                        regionProps={regions.contentTop}
                    />
                )}
            </AnimateHeight>
            <IndexPageNavigation
                pageProps={currentPageProps}
                navigate={navigate}
            />
            <AnimateHeight trigger={_id}>
                <Region
                    pageProps={currentPageProps}
                    regionProps={regions.contentBottom}
                />
            </AnimateHeight>
        </LayoutContainer>
    );
};

type Props = {
    pageProps: ContentProps;
};

// This page component should always be used in the templates for the FrontPage and AreaPage types
// (and nothing else!)
export const IndexPage = ({ pageProps }: Props) => {
    if (pageProps.__typename === ContentType.TemplatePage) {
        return <IndexPageTemplate pageProps={pageProps} />;
    }

    if (
        pageProps.__typename !== ContentType.AreaPage &&
        pageProps.__typename !== ContentType.FrontPage
    ) {
        console.error(
            `Invalid content type specified for IndexPage - id ${pageProps._id}`
        );
        return null;
    }

    return <IndexPageContent {...pageProps} />;
};
