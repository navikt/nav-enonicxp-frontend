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
import { BEM } from '../utils/bem';

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
    component: ComponentProps;
    pageProps: ContentProps;
};

const ComponentMapper = ({ component, pageProps }: Props) => {
    switch (component.type) {
        case ComponentType.Text:
            return <Text {...component} />;
        case ComponentType.Image:
            return <Image imageUrl={component.image.imageUrl} />;
        case ComponentType.Layout:
            return <Layout pageProps={pageProps} layoutProps={component} />;
        case ComponentType.Part:
            return (
                <PartsMapper componentProps={component} pageProps={pageProps} />
            );
        default:
            return (
                <div>{`Unimplemented component type: ${component.type}`}</div>
            );
    }
};

export const XpComponent = ({ component, pageProps }: Props) => {
    const { path } = component;
    const className = getClass(component);

    const componentStyle =
        component.type === ComponentType.Layout
            ? {
                  ...(component?.config?.margin && {
                      margin: `${component?.config?.margin}`,
                  }),
              }
            : undefined;

    return (
        <div
            key={path}
            style={componentStyle}
            data-portal-component-type={component.type}
            data-portal-component={path}
            className={`${bem()} ${className}`}
            data-th-remove="tag"
        >
            <ComponentMapper component={component} pageProps={pageProps} />
        </div>
    );
};
