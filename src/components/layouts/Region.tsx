import React from 'react';
import { ContentProps } from '../../types/content-props/_content-common';
import { BEM } from '../../utils/bem';
import { ComponentMapper } from '../ComponentMapper';
import { RegionProps } from '../../types/component-props/layouts';
import './Region.less';

type Props = {
    pageProps: ContentProps;
    regionProps: RegionProps;
    style?: React.CSSProperties;
    modifier?: string;
};

const bem = BEM('region');

export const Region = ({ pageProps, regionProps, style, modifier }: Props) => {
    const { name, components } = regionProps;

    return (
        <div
            style={style}
            className={`${bem()} ${bem(name)} ${
                modifier ? bem(name, modifier) : ''
            }`}
            data-portal-region={pageProps.editMode ? name : undefined}
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
