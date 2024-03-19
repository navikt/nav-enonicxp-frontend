import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { FixedColsLayoutProps } from '../../../types/component-props/layouts/fixed-cols';
import { LayoutContainer } from '../LayoutContainer';

import style from './FixedColsLayout.module.scss';

type Props = {
    pageProps: ContentProps;
    layoutProps?: FixedColsLayoutProps;
};

export const FixedColsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    if (!regions) {
        return null;
    }

    const { distribution } = config;

    return (
        <LayoutContainer
            className={style.layout}
            pageProps={pageProps}
            layoutProps={layoutProps}
        >
            {Object.values(regions).map((regionProps, index) => {
                const regionStyle = distribution
                    ? {
                          flex: `${distribution.split('-')[index]}`,
                      }
                    : undefined;

                return (
                    <Region
                        className={style.region}
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
