import React from 'react';
import { GlobalPageSchema } from '../../../types/content-types/_schema';
import DynamicRegions from './DynamicRegions';
import './DynamicPage.less';

export const DynamicPage = (props: GlobalPageSchema) => {
    const dynamicPage = props.page;
    const dynamicComponents = props.components;
    const dynamicRegions = dynamicPage?.regions;

    return (
        <div className={'dynamic-page'}>
            {dynamicRegions ? (
                <DynamicRegions
                    regions={dynamicRegions}
                    pageComponents={dynamicComponents}
                />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
