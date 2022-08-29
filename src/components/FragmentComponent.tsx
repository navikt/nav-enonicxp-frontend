import React from 'react';
import {
    ComponentType,
    FragmentComponentProps,
} from '../types/component-props/_component-common';
import { ContentProps } from '../types/content-props/_content-common';
import { ComponentMapper } from './ComponentMapper';

type Props = {
    componentProps: FragmentComponentProps;
    pageProps: ContentProps;
};

export const FragmentComponent = ({ componentProps, pageProps }: Props) => {
    if (pageProps.editorView === 'edit') {
        const editorProps = {
            'data-portal-component-type': ComponentType.Fragment,
            'data-portal-component': componentProps.path,
        };

        return (
            <div {...editorProps}>
                <ComponentMapper
                    pageProps={pageProps}
                    componentProps={componentProps.fragment}
                />
            </div>
        );
    }

    return (
        <ComponentMapper
            pageProps={pageProps}
            componentProps={componentProps.fragment}
        />
    );
};
