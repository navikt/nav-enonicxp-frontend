import React from 'react';
import { Regions } from '../../../types/content-types/_schema';
import { GlobalPageSchema } from '../../../types/content-types/_schema';
import './FragmentPage.less';
import DynamicRegions from '../_dynamic/DynamicRegions';

export const FragmentPage = (props: GlobalPageSchema) => {
    const dynamicGlobalComponents = props.components;
    const dynamicRegions: Regions = {
        main: {
            name: 'main',
            components: dynamicGlobalComponents as any,
        },
    };

    return (
        <DynamicRegions
            dynamicRegions={dynamicRegions}
            dynamicGlobalComponents={dynamicGlobalComponents}
        />
    );
};
