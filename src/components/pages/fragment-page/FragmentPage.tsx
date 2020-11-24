import React from 'react';
import { GlobalPageProps } from 'types/content-props/_content-common';
import LayoutsMapper from '../../layouts/LayoutsMapper';
import './FragmentPage.less';

export const FragmentPage = (props: GlobalPageProps) => {
    const dynamicGlobalComponents = props.components;
    const dynamicRegions: LayoutsMapper = {
        main: {
            name: 'main',
            components: dynamicGlobalComponents as any,
        },
    };

    return <LayoutsMapper dynamicRegions={dynamicRegions} {...props} />;
};
