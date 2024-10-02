import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutContainer } from 'components/layouts/LayoutContainer';
import Region from 'components/layouts/Region';
import { GeneralPageHeader } from 'components/_common/headers/generalPageHeader/GeneralPageHeader';
import { PageUpdatedInfo } from 'components/_common/pageUpdatedInfo/PageUpdatedInfo';
import { ProductDataMixin } from 'types/component-props/_mixins';

type Props = {
    pageProps: ContentProps & {
        data: Pick<ProductDataMixin, 'illustration' | 'customCategory' | 'taxonomy'>;
    };
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
    const { type, displayName, language, data } = pageProps;
    const { title, illustration, taxonomy, audience, customCategory, ingress, hideIngress } = data;

    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    const showHeaderAndChangedate = hasGeneralComponents.has(pageProps.type);

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {showHeaderAndChangedate && (
                <GeneralPageHeader
                    pageProps={{
                        type,
                        displayName,
                        language,
                        data: {
                            title: title ?? '',
                            illustration,
                            taxonomy,
                            audience,
                            customCategory,
                            ingress,
                            hideIngress,
                        },
                    }}
                    hideIngressOverride
                />
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
