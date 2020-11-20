import React from 'react';
import { GlobalPageProps } from '../../../types/content-types/_schema';
import { BEM } from '../../../utils/bem';
import { RegionProps } from '../../../types/components/_common';
import { ComponentMapper } from './ComponentMapper';

const bem = BEM('region');

// export interface RegionProps {
//     dynamicKey: number;
//     dynamicRegion: DynamicRegion;
//     dynamicConfig?: DynamicRegionConfig;
// }

const getClass = (descriptor: string) => bem(descriptor.split(':')[1]);

type Props = {
    pageProps: GlobalPageProps;
    regionProps?: RegionProps;
};

export const Region = ({ pageProps, regionProps }: Props) => {
    const { name, components } = regionProps;

    // const dynamicRegionComponents = regionProps.components || [];
    // const dynamicConfig = props.dynamicConfig;

    // const dynamicStyle = {
    //     ...(dynamicConfig?.distribution && {
    //         flex: `${dynamicConfig.distribution.split('-')[props.dynamicKey]}`,
    //     }),
    // };

    return (
        <div
            key={name}
            // style={dynamicStyle}
            data-portal-region={name}
            className={`${bem()} ${bem(name)}`}
        >
            {components.map((component) => {
                const className = getClass(component.descriptor);

                // const dynamicStyle = {
                //     ...(component?.config?.margin && {
                //         margin: `${component?.config?.margin}`,
                //     }),
                // };

                return (
                    <div
                        key={component.path}
                        // style={dynamicStyle}
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
