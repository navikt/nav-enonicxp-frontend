import React from 'react';
import {
    ComponentProps,
    ComponentType,
} from '../types/component-props/_component-common';
import { Text } from './parts/_text/Text';
import Image from './parts/_image/Image';
import { PartsMapper } from './parts/PartsMapper';
import { ContentProps } from '../types/content-props/_content-common';
import { LayoutMapper } from './layouts/LayoutMapper';
import { FragmentComponent } from './FragmentComponent';
import { AuthDependantRender } from './_common/auth-dependant-render/AuthDependantRender';

type Props = {
    componentProps: ComponentProps;
    pageProps: ContentProps;
};

export const ComponentToRender = ({ componentProps, pageProps }: Props) => {
    if (!componentProps?.type) {
        return <div>{'Error: missing component props'}</div>;
    }

    switch (componentProps.type) {
        case ComponentType.Text:
            return (
                <Text
                    textProps={componentProps}
                    editMode={!!pageProps.editorView}
                />
            );
        case ComponentType.Image:
            return (
                <Image
                    imageProps={componentProps}
                    editMode={!!pageProps.editorView}
                />
            );
        case ComponentType.Layout:
        case ComponentType.Page:
            return (
                <LayoutMapper
                    layoutProps={componentProps}
                    pageProps={pageProps}
                />
            );
        case ComponentType.Part:
            return (
                <PartsMapper partProps={componentProps} pageProps={pageProps} />
            );
        case ComponentType.Fragment:
            return (
                <FragmentComponent
                    componentProps={componentProps}
                    pageProps={pageProps}
                />
            );
        default:
            return (
                <div>{`Unimplemented component type: ${
                    (componentProps as any).type
                }`}</div>
            );
    }
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    return (
        <AuthDependantRender
            renderOn={componentProps?.config?.renderOnAuthState}
        >
            <ComponentToRender
                componentProps={componentProps}
                pageProps={pageProps}
            />
        </AuthDependantRender>
    );
};
