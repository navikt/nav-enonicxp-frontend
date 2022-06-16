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
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { LenkeInline } from '../../_common/lenke/LenkeInline';

export type IndexPageContentProps = FrontPageProps | AreaPageProps;

const IndexPageContent = (pageProps: IndexPageContentProps) => {
    const { currentPageProps, navigate } = useIndexPageRouting(pageProps);

    const { regions } = currentPageProps.page;

    return (
        <LayoutContainer
            pageProps={currentPageProps}
            layoutProps={currentPageProps.page}
        >
            <Head>
                <title>{getPageTitle(currentPageProps)}</title>
                {/*TODO: Remove this before public release*/}
                <meta name={'robots'} content={'noindex, nofollow'} />
            </Head>
            {pageProps.serverEnv !== 'prod' && (
                <AlertBox variant={'warning'}>
                    {
                        'Hei! Disse sidene er under utvikling og er ikke helt klare til bruk ennå. '
                    }
                    <LenkeInline href={'/no/person'}>
                        {'Gå til dagens forside.'}
                    </LenkeInline>
                </AlertBox>
            )}
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

type Props = {
    pageProps: ContentProps;
};

// This page component should always be used in the templates for the FrontPage and AreaPage types
// (and nothing else!)
export const IndexPage = ({ pageProps }: Props) => {
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
