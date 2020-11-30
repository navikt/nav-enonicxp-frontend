import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM } from '../../utils/bem';
import { XpComponent } from '../ComponentMapper';
import { RegionProps, LayoutConfig } from '../../types/component-props/layouts';

const bem = BEM('region');

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
            {components.map((component) => (
                <XpComponent component={component} pageProps={pageProps} />
            ))}
        </div>
    );
};

export default Region;
