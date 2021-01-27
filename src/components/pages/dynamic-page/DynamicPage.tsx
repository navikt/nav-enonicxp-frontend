import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { ComponentMapper } from '../../ComponentMapper';

export const DynamicPage = (props: ContentProps) => {
    return props.page.regions ? (
        <ComponentMapper pageProps={props} componentProps={props.page} />
    ) : (
        <div data-portal-region={'main'} />
    );
};
