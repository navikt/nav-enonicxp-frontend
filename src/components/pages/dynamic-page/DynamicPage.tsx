import React from 'react';
import { DynamicPageProps } from '../../../types/content-props/dynamic-page-props';
import Layout from '../../layouts/Layout';
import './DynamicPage.less';

export const DynamicPage = (props: DynamicPageProps) => {
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
