import React from 'react';
import { CustomContentProps } from 'types/content-props/_content-common';
import { ComponentMapper } from '../../ComponentMapper';

export const DynamicPage = (props: CustomContentProps) => {
    return <ComponentMapper componentProps={props.page} pageProps={props} />;
};
