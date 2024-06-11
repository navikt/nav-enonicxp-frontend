import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { GeneralPageHeader } from 'components/_common/headers/general-page-header/GeneralPageHeader';
import { PageUpdatedInfo } from 'components/_common/pageUpdatedInfo/PageUpdatedInfo';

import styles from '../page-with-side-menus/PageWithSideMenus.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: SingleColPageProps;
};

export const SingleColPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer
            className={styles.pageWithSideMenus}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            <div className={styles.mainContent}>
                <GeneralPageHeader pageProps={pageProps} hideIngressOverride />
                <Region pageProps={pageProps} regionProps={regions.pageContent} />
                <PageUpdatedInfo datetime={pageProps.modifiedTime} isSituationPage />
            </div>
        </LayoutContainer>
    );
};
