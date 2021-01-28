import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import Region from '../Region';
import { FixedColsLayoutProps } from '../../../types/component-props/layouts/fixed-cols';
import './FixedColsLayout.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: FixedColsLayoutProps;
};

export const FixedColsLayout = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    return (
        <>
            {regions &&
                Object.values(regions).map((regionProps, index) => {
                    const regionStyle = config
                        ? {
                              ...(config?.distribution && {
                                  flex: `${
                                      config.distribution.split('-')[index]
                                  }`,
                              }),
                          }
                        : undefined;

                    return (
                        <Region
                            pageProps={pageProps}
                            regionProps={regionProps}
                            style={regionStyle}
                            key={index}
                        />
                    );
                })}
        </>
    );
};
