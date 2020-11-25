import React from 'react';
import { ComponentProps } from '../types/component-props/_component-common';
import { Text } from './parts/_dynamic/text/Text';
import Image from './parts/_dynamic/image/Image';
import Layouts from './layouts/Layouts';
import { PartsMapper } from './parts/PartsMapper';
import { ContentProps } from '../types/content-props/_content-common';

type Props = {
    componentProps: ComponentProps;
    pageProps: ContentProps;
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    if (componentProps.type === 'text') {
        return <Text {...componentProps} />;
    }

    if (componentProps.type === 'image') {
        return <Image imageUrl={componentProps.image.imageUrl} />;
    }

    if (componentProps.type === 'layout') {
        return <Layouts pageProps={pageProps} layoutProps={componentProps} />;
    }

    if (componentProps.type === 'part') {
        return (
            <PartsMapper
                componentProps={componentProps}
                pageProps={pageProps}
            />
        );
    }

    return <div>{`Unimplemented component type: ${componentProps.type}`}</div>;
};
