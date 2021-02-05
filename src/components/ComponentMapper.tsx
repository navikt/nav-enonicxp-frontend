import React from 'react';
import {
    ComponentProps,
    ComponentType,
} from '../types/component-props/_component-common';
import { Text } from './parts/_dynamic/text/Text';
import Image from './parts/_dynamic/image/Image';
import { PartsMapper } from './parts/PartsMapper';
import { ContentProps } from '../types/content-props/_content-common';
import { LayoutMapper } from './layouts/LayoutMapper';

type Props = {
    componentProps: ComponentProps;
    pageProps: ContentProps;
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    switch (componentProps.type) {
        case ComponentType.Text:
            return (
                <Text
                    textProps={componentProps}
                    editMode={pageProps.editMode}
                />
            );
        case ComponentType.Image:
            return (
                <Image
                    imageProps={componentProps}
                    editMode={pageProps.editMode}
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
            const editorProps = pageProps.editMode
                ? {
                      'data-portal-component-type': ComponentType.Part,
                      'data-portal-component': componentProps.path,
                  }
                : undefined;

            return (
                <div {...editorProps}>
                    <div>{'Fragment placeholder'}</div>
                </div>
            );
        default:
            return (
                <div>{`Unimplemented component type: ${componentProps.type}`}</div>
            );
    }
};
