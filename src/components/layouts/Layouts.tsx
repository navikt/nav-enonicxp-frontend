import React from 'react';
import { GlobalPageProps } from 'types/content-props/_content-common';
import { LayoutProps } from '../../types/component-props/layouts';
import Region from './Region';
import './Layouts.less';

type Props = {
    pageProps: GlobalPageProps;
    layoutProps?: LayoutProps;
};

export const Layouts = ({ pageProps, layoutProps }: Props) => {
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
                            key={index}
                        />
                    );
                })}
        </>
    );
};

export default Layouts;
