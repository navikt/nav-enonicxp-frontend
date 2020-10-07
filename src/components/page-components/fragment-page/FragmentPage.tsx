import React from 'react';
import { Regions } from '../../../types/content-types/_schema';
import { GlobalPageSchema } from '../../../types/content-types/_schema';
import DynamicRegions from '../_dynamic/DynamicRegions';
import './FragmentPage.less';

export const FragmentPage = (props: GlobalPageSchema) => {
    const pageComponents = props.components;
    const regions: Regions = {
        main: {
            name: 'main',
            components: pageComponents as any,
        },
    };

    return (
        <DynamicRegions
            dynamicRegions={regions}
            dynamicGlobalComponents={pageComponents}
        />
    );
};
