import React, { useEffect, useRef, useState } from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
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
import { InnholdssideMedMenyProps } from 'types/component-props/pages/innholdsside-med-meny';
import styles from './InnholdssideMedMeny.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: InnholdssideMedMenyProps;
};

export const InnholdssideMedMeny = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    const { language, languages } = usePageContentProps();
    const getLabel = translator('internalNavigation', language);
    const menuTitle = getLabel('pageNavigationMenu');
    const legacyNav = useLegacyNav();

    const dynamicNavigationRef = useRef<HTMLDivElement | null>(null);

    const [canExpandAll, setCanExpandAll] = useState(false);
    const [forceExpandAll, setForceExpandAll] = useState(false);
    const handleToggleExpandAll = () => setForceExpandAll((prev) => !prev);

    // Sjekk URL-parameter for å vise/skjule knapp for detaljert innholdsfortegnelse
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        if (params.get('expandAllNav') === 'true') {
            setCanExpandAll(true);
        }
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
                    styles.innholdssideMedMeny,
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

                    {showInternalNav && (
                        <>
                            <PageNavigationMenu
                                anchorLinks={anchorLinks}
                                title={menuTitle}
                                isChapterNavigation={true}
                            />
                            <DynamicNavigation
                                ref={dynamicNavigationRef}
                                className={styles.pageNavigationMenu}
                                anchorLinks={anchorLinks}
                                pageProps={pageProps}
                                title={menuTitle}
                                canExpandAll={canExpandAll}
                                forceExpandAll={forceExpandAll}
                                onToggleExpandAll={handleToggleExpandAll}
                            />
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
