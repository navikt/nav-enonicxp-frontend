import React from 'react';
import { FragmentPageProps } from '../../../types/content-props/fragment-page-props';
import { ComponentMapper } from '../../ComponentMapper';

export const FragmentPage = (props: FragmentPageProps) => {
    return (
        <ComponentMapper componentProps={props.fragment} pageProps={props} />
    );
};
