import React from 'react';
import { ContentTypeProps } from 'types/content-props/_content-common';
import Layouts from '../../layouts/Layouts';
import './DynamicPage.less';

export const DynamicPage = (props: ContentTypeProps) => {
    const { regions } = props.page;

    return (
        <div className={'dynamic-page'}>
            {regions ? (
                <Layouts pageProps={props} layoutProps={props.page} />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
