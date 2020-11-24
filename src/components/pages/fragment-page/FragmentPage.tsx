import React from 'react';
import { GlobalPageProps } from 'types/content-props/_content-common';
import Layouts from '../../layouts/Layouts';
import './FragmentPage.less';

export const FragmentPage = (props: GlobalPageProps) => {
    const dynamicGlobalComponents = props.components;
    const dynamicRegions: Layouts = {
        main: {
            name: 'main',
            components: dynamicGlobalComponents as any,
        },
    };

    return <Layouts dynamicRegions={dynamicRegions} {...props} />;
};
