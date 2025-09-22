import React, { useEffect, useRef, useState } from 'react';
import { FileTextIcon } from '@navikt/aksel-icons';
import { ExpansionCard, HStack } from '@navikt/ds-react';
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
    const menuTitle = getLabel('pageNavigationMenu');
    const legacyNav = useLegacyNav();
    const dynamicNavigationRef = useRef<HTMLDivElement | null>(null);
    const mobileExpandableMenuRef = useRef<HTMLDivElement | null>(null);
    const stickyExpandableToggleRef = useRef<HTMLDivElement | null>(null);

    const [hasScrolledPastContentMenu, setHasScrolledPastContentMenu] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const desktopBreakPoint = 1024; //Hold i sync med common.mq-screen-desktop

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const update = () => setIsDesktop(window.innerWidth >= desktopBreakPoint);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        if (isDesktop) return;

        const stickyExpandableToggleElement = stickyExpandableToggleRef.current;
        if (!stickyExpandableToggleElement) return;

        const observer = new IntersectionObserver(([toggleElement]) => {
            if (!toggleElement) return;
            const isAboveCurrentBrowserView = toggleElement.boundingClientRect.bottom < 0;

            if (toggleElement.isIntersecting) {
                setHasScrolledPastContentMenu(false);
            } else {
                if (isAboveCurrentBrowserView) {
                    setHasScrolledPastContentMenu(true);
                } else {
                    setHasScrolledPastContentMenu(false);
                }
            }
        });

        observer.observe(stickyExpandableToggleElement);

        return () => observer.disconnect();
    }, [isDesktop]);

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
                            title={menuTitle}
                            isChapterNavigation={true}
                        />
                    )}

                    {showInternalNav &&
                        !legacyNav &&
                        (isDesktop ? (
                            <DynamicNavigation
                                ref={dynamicNavigationRef}
                                className={styles.pageNavigationMenu}
                                anchorLinks={anchorLinks}
                                pageProps={pageProps}
                                title={menuTitle}
                            />
                        ) : hasScrolledPastContentMenu ? (
                            <>
                                <div className={styles.placeholder} />
                                <ExpansionCard
                                    ref={mobileExpandableMenuRef}
                                    size="small"
                                    className={styles.mobileExpandableMenu}
                                    aria-label={menuTitle}
                                >
                                    <ExpansionCard.Header>
                                        <HStack wrap={false} gap="space-8" align="center">
                                            <FileTextIcon aria-hidden fontSize="1.5rem" />
                                            <ExpansionCard.Title>{menuTitle}</ExpansionCard.Title>
                                        </HStack>
                                    </ExpansionCard.Header>
                                    <ExpansionCard.Content>
                                        <DynamicNavigation
                                            anchorLinks={anchorLinks}
                                            pageProps={pageProps}
                                        />
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </>
                        ) : (
                            <DynamicNavigation
                                ref={dynamicNavigationRef}
                                className={styles.pageNavigationMenu}
                                anchorLinks={anchorLinks}
                                pageProps={pageProps}
                                title={menuTitle}
                            />
                        ))}

                    <div ref={stickyExpandableToggleRef} />

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
