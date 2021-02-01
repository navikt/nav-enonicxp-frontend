import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { FlexColsLayoutProps } from '../../../types/component-props/layouts/flex-cols';
import Region from '../Region';
import { LayoutContainer } from '../LayoutContainer';
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

    const {
        numCols,
        backgroundColor,
        bgFullWidth,
        marginTop,
        marginBottom,
        justifyContent,
    } = layoutProps.config;

    const regionStyle = {
        ...(justifyContent && { justifyContent }),
    };

    const innerStyle = {
        ...(!bgFullWidth &&
            backgroundColor && {
                backgroundColor,
            }),
    };

    const outerStyle = {
        ...(marginTop && { marginTop: `${marginTop}rem` }),
        ...(marginBottom && { marginBottom: `${marginBottom}rem` }),
        ...(bgFullWidth &&
            backgroundColor && {
                backgroundColor,
            }),
    };

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            fullwidth={bgFullWidth}
            innerStyle={innerStyle}
            outerStyle={outerStyle}
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
