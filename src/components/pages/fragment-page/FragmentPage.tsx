import React from 'react';
import { DynamicRegions } from 'types/content-types/_schema';
import { GlobalPageProps } from 'types/content-types/_schema';
import Regions from '../regions-page/Regions';
import './FragmentPage.less';

export const FragmentPage = (props: GlobalPageProps) => {
    const dynamicGlobalComponents = props.components;
    const dynamicRegions: Regions = {
        main: {
            name: 'main',
            components: dynamicGlobalComponents as any,
        },
    };

    return <Regions dynamicRegions={dynamicRegions} {...props} />;
};
