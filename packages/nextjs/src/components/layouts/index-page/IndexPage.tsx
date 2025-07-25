import React from 'react';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { IndexPageProps } from 'types/component-props/pages/index-page';
import { AreaPageHeader } from './area-page/AreaPageHeader';
import { FrontPageAreaNavigation } from './front-page/FrontPageAreaNavigation';

import style from './IndexPage.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: IndexPageProps;
};

export const IndexPage = ({ pageProps, layoutProps }: Props) => {
    const { type } = pageProps;
    const { regions } = layoutProps;

    const renderPageSpecificContent = () => {
        if (type === ContentType.FrontPage) {
            return <FrontPageAreaNavigation content={pageProps} />;
        }

        if (type === ContentType.AreaPage) {
            return <AreaPageHeader content={pageProps} />;
        }

        return null;
    };

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            className={style.indexPage}
        >
            <>
                {/* We don't use this region on the AreaPage atm */}
                {type !== ContentType.AreaPage && (
                    <Region pageProps={pageProps} regionProps={regions.contentTop} />
                )}
                {renderPageSpecificContent()}
                <Region
                    className={style.contentBottom}
                    pageProps={pageProps}
                    regionProps={regions.contentBottom}
                />
            </>
        </LayoutContainer>
    );
};
