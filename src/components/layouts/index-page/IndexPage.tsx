import React from 'react';
import { LayoutContainer } from '../LayoutContainer';
import Region from '../Region';
import {
    AreaPageProps,
    FrontPageProps,
} from '../../../types/content-props/index-pages-props';
import {
    ContentProps,
    ContentType,
} from '../../../types/content-props/_content-common';
import { FrontPageAreaNavigation } from './front-page/FrontPageAreaNavigation';
import { IndexPageProps } from '../../../types/component-props/pages/index-page';
import { AreaPageHeader } from './navigation/areas-section/area-page-header/AreaPageHeader';

import style from './IndexPage.module.scss';

export type IndexPageContentProps = FrontPageProps | AreaPageProps;

type Props = {
    pageProps: ContentProps;
    layoutProps: IndexPageProps;
};

export const IndexPage = ({ pageProps, layoutProps }: Props) => {
    // if (pageProps.__typename === ContentType.TemplatePage) {
    //     return <IndexPageTemplate pageProps={pageProps} />;
    // }

    const { __typename } = pageProps;
    const { regions } = layoutProps;

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.indexPage}
        >
            <>
                {__typename !== ContentType.AreaPage && (
                    <Region
                        pageProps={pageProps}
                        regionProps={regions.contentTop}
                    />
                )}
                {__typename === ContentType.FrontPage ? (
                    <FrontPageAreaNavigation content={pageProps} />
                ) : __typename === ContentType.AreaPage ? (
                    <AreaPageHeader content={pageProps} />
                ) : (
                    () => null
                )}
                <Region
                    className={style.contentBottom}
                    pageProps={pageProps}
                    regionProps={regions.contentBottom}
                />
            </>
        </LayoutContainer>
    );
};
