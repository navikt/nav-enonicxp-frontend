import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import Layout from '../../layouts/Layout';
import './DynamicPage.less';

export const DynamicPage = (props: ContentProps) => {
    const { regions } = props.page;

    return (
        <div className={'dynamic-page'}>
            {regions ? (
                <Layout pageProps={props} layoutProps={props.page} />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
