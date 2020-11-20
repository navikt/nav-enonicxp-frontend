import React from 'react';
import { GlobalPageProps } from 'types/content-types/_schema';
import Regions from './Regions';
import './DynamicPage.less';

export const DynamicPage = (props: GlobalPageProps) => {
    const regions = props.page?.regions;

    return (
        <div className={'dynamic-page'}>
            {regions ? (
                <Regions pageProps={props} regions={regions} />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
