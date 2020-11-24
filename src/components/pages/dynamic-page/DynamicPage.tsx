import React from 'react';
import { GlobalPageProps } from 'types/content-props/_content-common';
import LayoutsMapper from '../../layouts/LayoutsMapper';
import './DynamicPage.less';

export const DynamicPage = (props: GlobalPageProps) => {
    const { regions } = props.page;

    return (
        <div className={'dynamic-page'}>
            {regions ? (
                <LayoutsMapper pageProps={props} layoutProps={props.page} />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
