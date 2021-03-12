import React from 'react';
import {
    ComponentProps,
    ComponentType,
} from '../types/component-props/_component-common';
import { Text } from './parts/_dynamic/text/Text';
import Image from './parts/_dynamic/image/Image';
import Layout from './layouts/Layout';
import { PartsMapper } from './parts/PartsMapper';
import { ContentProps } from '../types/content-props/_content-common';
import { BEM, classNames } from '../utils/classnames';

const bem = BEM('region');

const getClass = (component: ComponentProps) => {
    switch (component.type) {
        case ComponentType.Page:
        case ComponentType.Layout:
        case ComponentType.Part:
            return bem(component?.descriptor?.split(':')[1] || 'default');
        default:
            return bem('default');
    }
};

type Props = {
    componentProps: ComponentProps;
    pageProps: ContentProps;
};

const Component = ({ componentProps, pageProps }: Props) => {
    switch (componentProps.type) {
        case ComponentType.Text:
            return <Text {...componentProps} />;
        case ComponentType.Image:
            return <Image imageUrl={componentProps.image.imageUrl} />;
        case ComponentType.Layout:
            return (
                <Layout pageProps={pageProps} layoutProps={componentProps} />
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
                <div>{`Unimplemented component type: ${componentProps.type}`}</div>
            );
    }
};

export const ComponentMapper = ({ componentProps, pageProps }: Props) => {
    const { path } = componentProps;
    const className = getClass(componentProps);

    const componentStyle =
        componentProps.type === ComponentType.Layout
            ? {
                  ...(componentProps?.config?.margin && {
                      margin: `${componentProps?.config?.margin}`,
                  }),
              }
            : undefined;

    return (
        <div
            key={path}
            style={componentStyle}
            data-portal-component-type={componentProps.type}
            data-portal-component={path}
            className={classNames(bem(), className)}
            data-th-remove="tag"
        >
            <Component componentProps={componentProps} pageProps={pageProps} />
        </div>
    );
};
