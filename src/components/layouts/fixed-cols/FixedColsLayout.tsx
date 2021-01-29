import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { FixedColsLayoutProps } from '../../../types/component-props/layouts/fixed-cols';
import { LayoutContainer } from '../LayoutContainer';
import './FixedColsLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: FixedColsLayoutProps;
};

export const FixedColsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!regions) {
        return null;
    }

    const {
        backgroundColor,
        bgFullWidth,
        marginTop,
        marginBottom,
        distribution,
    } = config;

    const layoutStyle = {
        ...(!bgFullWidth &&
            backgroundColor && {
                backgroundColor: backgroundColor,
            }),
    };

    const outerStyle = {
        ...(marginTop && { marginTop: `${marginTop}rem` }),
        ...(marginBottom && { marginBottom: `${marginBottom}rem` }),
        ...(bgFullWidth &&
            backgroundColor && {
                backgroundColor: backgroundColor,
            }),
    };

    return (
        <LayoutContainer
            pageProps={pageProps}
            layoutProps={layoutProps}
            layoutStyle={layoutStyle}
            outerStyle={outerStyle}
        >
            {Object.values(regions).map((regionProps, index) => {
                const regionStyle = distribution
                    ? {
                          flex: `${distribution.split('-')[index]}`,
                      }
                    : undefined;

                return (
                    <Region
                        pageProps={pageProps}
                        regionProps={regionProps}
                        regionStyle={regionStyle}
                        key={index}
                    />
                );
            })}
        </LayoutContainer>
    );
};
