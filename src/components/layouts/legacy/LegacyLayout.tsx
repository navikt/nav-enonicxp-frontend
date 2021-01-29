import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutProps } from '../../../types/component-props/layouts';
import Region from '../Region';
import { LayoutWrapper } from '../LayoutWrapper';
import './LegacyLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

export const LegacyLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutWrapper pageProps={pageProps} layoutProps={layoutProps}>
            {Object.values(regions).map((regionProps, index) => {
                return (
                    <Region
                        pageProps={pageProps}
                        regionProps={regionProps}
                        key={index}
                    />
                );
            })}
        </LayoutWrapper>
    );
};
