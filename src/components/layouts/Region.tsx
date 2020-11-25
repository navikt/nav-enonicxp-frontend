import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM } from '../../utils/bem';
import {
    ComponentProps,
    ComponentType,
} from '../../types/component-props/_component-common';
import { ComponentMapper } from '../ComponentMapper';
import { RegionProps, LayoutConfig } from '../../types/component-props/layouts';

const bem = BEM('region');

const getClass = (component: ComponentProps) => {
    switch (component.type) {
        case ComponentType.Page:
        case ComponentType.Layout:
        case ComponentType.Part:
            return bem(component.descriptor.split(':')[1] || 'default');
        default:
            return bem('default');
    }
};

type Props = {
    pageProps: ContentProps;
    regionProps?: RegionProps;
    layoutConfig?: LayoutConfig;
    regionIndex?: number;
};

export const Region = ({
    pageProps,
    regionProps,
    layoutConfig,
    regionIndex = 0,
}: Props) => {
    const { name, components } = regionProps;

    const regionStyle = layoutConfig
        ? {
              ...(layoutConfig?.distribution && {
                  flex: `${layoutConfig.distribution.split('-')[regionIndex]}`,
              }),
          }
        : undefined;

    return (
        <div
            key={name}
            style={regionStyle}
            data-portal-region={name}
            className={`${bem()} ${bem(name)}`}
        >
            {components.map((component) => {
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
                        key={component.path}
                        style={componentStyle}
                        data-portal-component-type={component.type}
                        data-portal-component={component.path}
                        className={`${bem()} ${className}`}
                        data-th-remove="tag"
                    >
                        <ComponentMapper
                            componentProps={component}
                            pageProps={pageProps}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Region;
