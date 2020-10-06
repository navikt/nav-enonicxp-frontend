import React from 'react';
import { Regions } from '../../../types/content-types/_schema';
import { GlobalPageSchema } from '../../../types/content-types/_schema';
import DynamicRegions from '../../DynamicRegions';
import './FragmentPage.less';

export const FragmentPage = (props: GlobalPageSchema) => {
    const components = props.components;
    const regions: Regions = {
        main: {
            name: 'main',
            components: components as any,
        },
    };
    return <DynamicRegions regions={regions} components={components} />;
};
