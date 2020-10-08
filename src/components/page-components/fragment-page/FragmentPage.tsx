import React from 'react';
import { DynamicRegions } from 'types/content-types/_schema';
import { GlobalPageSchema } from 'types/content-types/_schema';
import Regions from '../_dynamic/DynamicRegions';
import './FragmentPage.less';

export const FragmentPage = (props: GlobalPageSchema) => {
    const dynamicGlobalComponents = props.components;
    const dynamicRegions: DynamicRegions = {
        main: {
            name: 'main',
            components: dynamicGlobalComponents as any,
        },
    };

    return <Regions dynamicRegions={dynamicRegions} {...props} />;
};
