import React from 'react';
import { GlobalPageSchema } from 'types/content-types/_schema';
import DynamicRegions from './DynamicRegions';
import './DynamicPage.less';

export const DynamicPage = (props: GlobalPageSchema) => {
    const dynamicRegions =
        props.page?.regions || props?.pageTemplate?.page.regions;

    return (
        <div className={'dynamic-page'}>
            {dynamicRegions ? (
                <DynamicRegions dynamicRegions={dynamicRegions} {...props} />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
