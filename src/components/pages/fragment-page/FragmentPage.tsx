import React from 'react';
import { GlobalPageProps } from 'types/content/_common';
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
