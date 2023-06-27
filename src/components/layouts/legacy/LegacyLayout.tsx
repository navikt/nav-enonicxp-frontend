import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { LegacyLayoutProps } from 'types/component-props/layouts/legacy-layout';
import { NewsPressHeader } from 'components/parts/_legacy/main-article/komponenter/NewsPressHeader';
import { ComponentType } from 'types/component-props/_component-common';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LegacyLayoutProps;
};

export const LegacyLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    const isNewsArticle =
        pageProps.type === ContentType.MainArticle &&
        (pageProps.data.contentType === 'news' ||
            pageProps.data.contentType === 'pressRelease');

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            {isNewsArticle && layoutProps.type === ComponentType.Page && (
                <NewsPressHeader
                    type={pageProps.data.contentType}
                    title={pageProps.displayName}
                    language={pageProps.language}
                />
            )}
            {Object.values(regions).map((regionProps, index) => {
                return (
                    <Region
                        pageProps={pageProps}
                        regionProps={regionProps}
                        key={index}
                    />
                );
            })}
        </LayoutContainer>
    );
};
