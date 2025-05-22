import React, { useEffect, useRef } from 'react';
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
    const regionRef = useRef<HTMLDivElement>(null);
    const [hasContactOptions, setHasContactOptions] = React.useState(false);
    const { regions } = layoutProps;

    useEffect(() => {
        if (regionRef.current) {
            setHasContactOptions(!!regionRef.current.querySelector('.part__contact-option'));
        }
    }, []);

    if (!regions) return null;

    const showHeaderAndChangedate = hasGeneralComponents.has(pageProps.type);

    const insertPageUpdatedInfo = (element: JSX.Element, key: string) => {
        const components = regions.pageContent.components;
        const currentIndex = components.findIndex((comp) => comp.path === key);

        const isLastElement = currentIndex === components.length - 1;
        const isSecondLastElement = currentIndex === components.length - 2;

        let shouldShowUpdatedInfo = false;
        if (hasContactOptions) {
            shouldShowUpdatedInfo = isSecondLastElement;
        } else {
            shouldShowUpdatedInfo = isLastElement;
        }

        return (
            <React.Fragment key={key}>
                {element}
                {showHeaderAndChangedate && shouldShowUpdatedInfo && (
                    <PageUpdatedInfo
                        datetime={pageProps.modifiedTime}
                        language={pageProps.language}
                    />
                )}
            </React.Fragment>
        );
    };

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
            <div ref={regionRef}>
                <Region
                    pageProps={pageProps}
                    regionProps={regions.pageContent}
                    wrapperFunction={insertPageUpdatedInfo}
                />
            </div>
        </LayoutContainer>
    );
};
