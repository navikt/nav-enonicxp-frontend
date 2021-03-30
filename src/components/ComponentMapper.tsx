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
            return <Text {...componentProps} />;
        case ComponentType.Image:
            return <Image imageUrl={componentProps.image.imageUrl} />;
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
                <PartsMapper
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
