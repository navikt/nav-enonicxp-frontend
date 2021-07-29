import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { ComponentMapper } from '../../ComponentMapper';

export const DynamicPage = (props: ContentProps) => {
    // @ts-ignore
    const { asfasdf } = props.testymctestface;

    return props.page?.regions ? (
        <ComponentMapper componentProps={props.page} pageProps={props} />
    ) : (
        <div data-portal-region={'main'} />
    );
};
