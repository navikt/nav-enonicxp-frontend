import React from 'react';
import { CustomContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { LegacyLayoutProps } from '../../../types/component-props/layouts/legacy-layout';

type Props = {
    pageProps: CustomContentProps;
    layoutProps?: LegacyLayoutProps;
};

export const LegacyLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions } = layoutProps;

    if (!regions) {
        return null;
    }

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
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
