import React from 'react';
import { CustomContentProps } from '../../../types/content-props/_content-common';
import { FlexColsLayoutProps } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';

type Props = {
    pageProps: CustomContentProps;
    layoutProps?: FlexColsLayoutProps;
};

export const FlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions?.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { numCols, justifyContent } = config;

    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };

    return (
        <LayoutContainer pageProps={pageProps} layoutProps={layoutProps}>
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                regionStyle={regionStyle}
                bemModifier={`${numCols}-cols`}
            />
        </LayoutContainer>
    );
};
