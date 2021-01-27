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
            return <Text {...componentProps} />;
        case ComponentType.Image:
            return <Image {...componentProps} />;
        case ComponentType.Layout:
        case ComponentType.Page:
            return (
                <LayoutMapper
                    pageProps={pageProps}
                    layoutProps={componentProps}
                />
            );
        case ComponentType.Part:
            return (
                <PartsMapper
                    pageProps={pageProps}
                    componentProps={componentProps}
                />
            );
        default:
            return (
                <div>{`Unimplemented component type: ${componentProps.type}`}</div>
            );
    }
};
