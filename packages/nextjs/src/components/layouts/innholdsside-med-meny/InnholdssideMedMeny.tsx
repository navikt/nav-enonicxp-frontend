import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { GeneralPageHeader } from 'components/_common/headers/generalPageHeader/GeneralPageHeader';
import { PageUpdatedInfo } from 'components/_common/pageUpdatedInfo/PageUpdatedInfo';
import { usePageContentProps } from 'store/pageContext';
import { classNames } from 'utils/classnames';
import { InnholdssideMedMenyProps } from 'types/component-props/pages/innholdsside-med-meny';
import { CombinedMenu } from 'components/_common/pageNavigationMenu/CombinedMenu.tsx/CombinedMenu';
import styles from './InnholdssideMedMeny.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps: InnholdssideMedMenyProps;
};

export const InnholdssideMedMeny = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;
    const { languages } = usePageContentProps();

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
                    {showInternalNav && (
                        <CombinedMenu anchorLinks={anchorLinks} pageProps={pageProps} />
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
