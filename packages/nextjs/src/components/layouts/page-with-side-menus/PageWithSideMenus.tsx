import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { PageNavigationMenu } from 'components/_common/pageNavigationMenu/PageNavigationMenu';
import { AlternativeAudience } from 'components/_common/alternativeAudience/AlternativeAudience';
import { HeaderWithTextAboveTitle } from 'components/_common/headers/headerWithTextAboveTitle/HeaderWithTextAboveTitle';
import { GeneralPageHeader } from 'components/_common/headers/generalPageHeader/GeneralPageHeader';
import { PageUpdatedInfo } from 'components/_common/pageUpdatedInfo/PageUpdatedInfo';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';

import styles from './PageWithSideMenus.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    const { language, languages } = usePageContentProps();
    const getLabel = translator('internalNavigation', language);

    if (!regions || !config) {
        return null;
    }

    const { showInternalNav, anchorLinks } = config;
    const { pageContent, topPageContent, bottomRow } = regions;
    const hasMultipleLanguages = languages && languages?.length > 0;

    const isNewLayoutPage =
        pageProps.type === ContentType.ProductPage ||
        pageProps.type === ContentType.GuidePage ||
        pageProps.type === ContentType.ThemedArticlePage ||
        pageProps.type === ContentType.GenericPage;

    return (
        <LayoutContainer
            className={classNames(styles.pageWithSideMenus, hasMultipleLanguages && styles.pullUp)}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            <div className={styles.mainContent}>
                {isNewLayoutPage && (
                    <HeaderWithTextAboveTitle
                        textAboveTitle={pageProps.data?.textAboveTitle}
                        title={pageProps.data?.title}
                        // illustration={pageProps.data?.illustration}
                    />
                )}
                {isNewLayoutPage && <GeneralPageHeader pageProps={pageProps} />}
                {!isNewLayoutPage && <Region pageProps={pageProps} regionProps={topPageContent} />}
                {isNewLayoutPage && <AlternativeAudience />}
                {showInternalNav && (
                    <PageNavigationMenu
                        anchorLinks={anchorLinks}
                        title={getLabel('pageNavigationMenu')}
                        isChapterNavigation={true}
                    />
                )}
                <Region pageProps={pageProps} regionProps={pageContent} />
                <PageUpdatedInfo datetime={pageProps.modifiedTime} language={pageProps.language} />
            </div>
            <div className={styles.bottomContent}>
                <Region pageProps={pageProps} regionProps={bottomRow} />
            </div>
        </LayoutContainer>
    );
};
