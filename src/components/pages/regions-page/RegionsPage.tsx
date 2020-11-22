import React from 'react';
import { GlobalPageProps } from 'types/content/_common';
import Regions from './Regions';
import './DynamicPage.less';

export const RegionsPage = (props: GlobalPageProps) => {
    const { regions } = props.page;

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
