import React from 'react';
import { GlobalPageProps } from 'types/content-types/_schema';
import { RegionsProps } from '../../../types/components/_common';
import Region from './Region';
import './Regions.less';

type Props = {
    pageProps: GlobalPageProps;
    regions?: RegionsProps;
};

export const Regions = ({ pageProps, regions }: Props) => {
    const dynamicRegions = regions || [];

    return (
        <>
            {Object.values(dynamicRegions).map((region) => (
                <Region
                    pageProps={pageProps}
                    regionProps={region}
                    key={region.name}
                />
            ))}
        </>
    );
};

export default Regions;
