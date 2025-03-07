import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { ComponentMapper } from 'components/ComponentMapper';

export const DynamicPage = (props: ContentProps) => {
    return <ComponentMapper componentProps={props.page} pageProps={props} />;
};
