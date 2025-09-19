import React, { useEffect, useRef } from 'react';
import { ExpansionCard } from '@navikt/ds-react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { PageNavigationMenu } from 'components/_common/pageNavigationMenu/PageNavigationMenu';
import { DynamicNavigation } from 'components/_common/pageNavigationMenu/DynamicNavigation';
import { AktuelleMalgrupper } from 'components/_common/aktuelleMalgrupper/AktuelleMalgrupper';
import { GeneralPageHeader } from 'components/_common/headers/generalPageHeader/GeneralPageHeader';
import { PageUpdatedInfo } from 'components/_common/pageUpdatedInfo/PageUpdatedInfo';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';
import { classNames } from 'utils/classnames';
import { useLegacyNav } from 'utils/useLegacyNav';
import styles from './PageWithSideMenus.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: PageWithSideMenusProps;
};

export const PageWithSideMenus = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    const { language, languages } = usePageContentProps();
    const getLabel = translator('internalNavigation', language);
    const legacyNav = useLegacyNav();
    const dynamicNavigationRef = useRef<HTMLDivElement | null>(null);
    const mobileExpandableMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const dynamicNavigationMenu = entries[0];

            // if (!entries[0].isIntersecting) {
            mobileExpandableMenuRef.current?.classList.toggle(
                styles.hide,
                dynamicNavigationMenu.isIntersecting
            );
            // }
        });

        const dynamicNavigationMenu = dynamicNavigationRef.current;
        if (dynamicNavigationMenu) observer.observe(dynamicNavigationMenu);

        // const mobileExpandableMenu = mobileExpandableMenuRef.current;
        // if (mobileExpandableMenu) observer.observe(mobileExpandableMenu);
    }, []);

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
        <>
            <LayoutContainer
                className={classNames(
                    styles.pageWithSideMenus,
                    hasMultipleLanguages && styles.pullUp
                )}
                pageProps={pageProps}
                layoutProps={layoutProps}
            >
                <div className={styles.mainContent}>
                    {isNewLayoutPage && <GeneralPageHeader pageProps={pageProps} />}
                    {!isNewLayoutPage && (
                        <Region pageProps={pageProps} regionProps={topPageContent} />
                    )}
                    {isNewLayoutPage && <AktuelleMalgrupper />}

                    {showInternalNav && legacyNav && (
                        <PageNavigationMenu
                            anchorLinks={anchorLinks}
                            title={getLabel('pageNavigationMenu')}
                            isChapterNavigation={true}
                        />
                    )}

                    {showInternalNav && !legacyNav && (
                        <>
                            <DynamicNavigation
                                className={styles.pageNavigationMenu}
                                anchorLinks={anchorLinks}
                                pageProps={pageProps}
                                title={getLabel('pageNavigationMenu')}
                                ref={dynamicNavigationRef}
                            />
                            <ExpansionCard
                                aria-label="Demo med bare tittel"
                                className={styles.mobileExpandableMenu}
                                ref={mobileExpandableMenuRef}
                            >
                                <ExpansionCard.Header>
                                    <ExpansionCard.Title>
                                        {getLabel('pageNavigationMenu')}
                                    </ExpansionCard.Title>
                                </ExpansionCard.Header>
                                <ExpansionCard.Content>
                                    <DynamicNavigation
                                        anchorLinks={anchorLinks}
                                        pageProps={pageProps}
                                    />
                                </ExpansionCard.Content>
                            </ExpansionCard>
                        </>
                    )}

                    <Region pageProps={pageProps} regionProps={pageContent} />
                    <PageUpdatedInfo
                        datetime={pageProps.modifiedTime}
                        language={pageProps.language}
                    />
                </div>
            </LayoutContainer>
            <Region pageProps={pageProps} regionProps={bottomRow} />
        </>
    );
};
