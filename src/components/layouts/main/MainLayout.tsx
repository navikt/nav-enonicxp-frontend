import React from 'react';
import Region from '../Region';
import { LayoutProps } from '../LayoutsMapper';

export const MainLayout = ({ pageProps, layoutProps }: LayoutProps) => {
    const { regions } = layoutProps;

    return (
        <>
            <Region
                pageProps={pageProps}
                regionProps={regions.first}
                regionIndex={0}
            />
            <Region
                pageProps={pageProps}
                regionProps={regions.second}
                regionIndex={1}
            />
        </>
    );
};
