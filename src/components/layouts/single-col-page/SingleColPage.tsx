import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { GeneralPageHeader } from 'components/_common/headers/general-page-header/GeneralPageHeader';
import { PageUpdatedInfo } from 'components/_common/pageUpdatedInfo/PageUpdatedInfo';

type Props = {
    pageProps: ContentProps;
    layoutProps: SingleColPageProps;
};

const hasGeneralComponents = new Set([
    ContentType.SituationPage,
    ContentType.ProductPage,
    ContentType.GuidePage,
    ContentType.GenericPage,
    ContentType.ToolsPage,
    ContentType.ThemedArticlePage,
]);

export const SingleColPage = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    const showHeaderAndChangedate = hasGeneralComponents.has(pageProps.type);

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {showHeaderAndChangedate && (
                <GeneralPageHeader pageProps={pageProps} hideIngressOverride />
            )}
            <Region pageProps={pageProps} regionProps={regions.pageContent} />
            {showHeaderAndChangedate && (
                <PageUpdatedInfo
                    datetime={pageProps.modifiedTime}
                    isSituationPage
                    language={pageProps.language}
                />
            )}
        </LayoutContainer>
    );
};
