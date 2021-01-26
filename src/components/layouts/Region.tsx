import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM } from '../../utils/bem';
import { ComponentMapper } from '../ComponentMapper';
import { RegionProps } from '../../types/component-props/layouts';

type Props = {
    pageProps: ContentProps;
    regionProps?: RegionProps;
    style?: React.CSSProperties;
    regionIndex?: number;
};

const bem = BEM('region');

export const Region = ({
    pageProps,
    regionProps,
    style,
    regionIndex = 0,
}: Props) => {
    const { name, components } = regionProps;

    return (
        <div
            key={name}
            style={style}
            data-portal-region={name}
            className={`${bem()} ${bem(name)}`}
        >
            {components.map((component) => (
                <ComponentMapper
                    key={component.path}
                    componentProps={component}
                    pageProps={pageProps}
                />
            ))}
        </div>
    );
};

export default Region;
