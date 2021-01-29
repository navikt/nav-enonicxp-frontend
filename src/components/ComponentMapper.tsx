import React from 'react';
import {
    ComponentProps,
    ComponentType,
} from '../types/component-props/_component-common';
import { Text } from './parts/_dynamic/text/Text';
import Image from './parts/_dynamic/image/Image';
import LayoutMapper from './layouts/LayoutMapper';
import { PartsMapper } from './parts/PartsMapper';
import { ContentProps } from '../types/content-props/_content-common';

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
        default:
            return (
                <div>{`Unimplemented component type: ${componentProps.type}`}</div>
            );
    }
};
