import React from 'react';
import { GlobalPageProps } from '../types/content-props/_content-common';
import { ComponentProps } from '../types/component-props/_component-common';
import { Text } from './parts/_dynamic/text/Text';
import Image from './parts/_dynamic/image/Image';
import LayoutsMapper from './layouts/LayoutsMapper';
import { PartsMapper } from './parts/PartsMapper';

type Props = {
    componentProps: ComponentProps;
    pageProps: GlobalPageProps;
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    if (componentProps.type === 'text') {
        return <Text {...componentProps} />;
    }

    if (componentProps.type === 'image') {
        return <Image imageUrl={componentProps.image.imageUrl} />;
    }

    if (componentProps.type === 'layout') {
        return (
            <LayoutsMapper pageProps={pageProps} layoutProps={componentProps} />
        );
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
