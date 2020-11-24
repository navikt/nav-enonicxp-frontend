import React from 'react';
import { LayoutProps } from '../LayoutsMapper';
import Region from '../Region';

export const MainPageLayout = (props: LayoutProps) => {
    const regionMain = props.layoutProps?.regions?.main;

    return (
        regionMain && (
            <Region pageProps={props.pageProps} regionProps={regionMain} />
        )
    );
};
