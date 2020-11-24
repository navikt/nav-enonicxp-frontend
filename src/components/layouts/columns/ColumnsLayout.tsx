import React from 'react';
import {
    LayoutType,
    RegionProps,
} from '../../../types/component-props/layouts';
import Region from '../Region';
import { LayoutProps } from '../LayoutsMapper';

const getNumCols = (descriptor: LayoutType) => Number(descriptor.split('-')[1]);

const dummyRegion = (index: number): RegionProps => ({
    name: `dynamic-${index}`,
    components: [],
});

export const ColumnsLayout = ({ pageProps, layoutProps }: LayoutProps) => {
    const regions = layoutProps.regions
        ? Object.values(layoutProps.regions)
        : [];
    const numCols = getNumCols(layoutProps.descriptor);

    return (
        <>
            {[...Array(numCols)].map((_, index) => {
                return (
                    <Region
                        pageProps={pageProps}
                        regionProps={regions[index] || dummyRegion(index)}
                        layoutConfig={layoutProps.config}
                        regionIndex={index}
                        key={index}
                    />
                );
            })}
        </>
    );
};
