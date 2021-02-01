import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { FlexColsLayoutProps } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
import { getCommonLayoutStyle } from '../LayoutStyle';
import './FlexColsLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: FlexColsLayoutProps;
};

export const FlexColsLayout = ({ pageProps, layoutProps }: Props) => {
    const regionProps = layoutProps.regions.flexcols;

    if (!regionProps) {
        return null;
    }

    const { config } = layoutProps;
    const { numCols, justifyContent, bgFullWidth } = config;

    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };

    const layoutStyle = getCommonLayoutStyle(config);

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={layoutStyle}
            fullwidth={bgFullWidth}
        >
            <Region
                pageProps={pageProps}
                regionProps={regionProps}
                regionStyle={regionStyle}
                bemModifier={`${numCols}-cols`}
            />
        </LayoutContainer>
    );
};
