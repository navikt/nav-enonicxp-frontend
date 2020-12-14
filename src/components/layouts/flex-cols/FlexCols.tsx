import React from 'react';
import { ContentProps } from '../../../types/content-props/_content-common';
import { LayoutProps } from '../../../types/component-props/layouts';
import Region from '../Region';
import './FlexCols.less';

type Props = {
    pageProps: ContentProps;
    layoutProps?: LayoutProps;
};

export const FlexCols = ({ pageProps, layoutProps }: Props) => {
    const { regions, config } = layoutProps;

    return (
        <>
            {regions &&
                Object.values(regions).map((regionProps, index) => {
                    return (
                        <Region
                            pageProps={pageProps}
                            regionProps={regionProps}
                            layoutConfig={config}
                            regionIndex={index}
                            className={'fixed-cols'}
                            key={index}
                        />
                    );
                })}
        </>
    );
};
