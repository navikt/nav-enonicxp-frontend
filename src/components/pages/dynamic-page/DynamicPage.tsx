import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { ComponentMapper } from '../../ComponentMapper';
import './DynamicPage.less';

export const DynamicPage = (props: ContentProps) => {
    return (
        <div className={'dynamic-page'}>
            {props.page.regions ? (
                <ComponentMapper
                    pageProps={props}
                    componentProps={props.page}
                />
            ) : (
                <div data-portal-region={'main'} />
            )}
        </div>
    );
};
