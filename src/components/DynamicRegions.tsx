import React from 'react';
import { Component, Regions } from '../types/content-types/_schema';
import Image from '../components/part-components/image/Image';
import { BEM } from '../utils/bem';
import './DynamicRegions.less';

interface RegionsProps {
    regions: Regions;
    components: Component[];
}

const bem = BEM('region');

const DynamicRegions = (props: RegionsProps) => {
    const regions = props.regions || [];
    return (
        <>
            {Object.entries(regions).map(([key, value]) => {
                return <DynamicRegion key={key} name={key} {...props} />;
            })}
        </>
    );
};

interface RegionProps extends RegionsProps {
    name: string;
}

const DynamicRegion = (props: RegionProps) => {
    const { name, components, regions } = props;
    const regionComponents = regions[name].components || [];

    return (
        <div key={name} data-portal-region={name} className={bem(name)}>
            {regionComponents.map((component) => {
                const className =
                    {
                        'no.nav.navno:main': bem('main'),
                        'no.nav.navno:main-1-col': bem('main-1-col'),
                        'no.nav.navno:search': bem('search'),
                    }[component.descriptor] || bem('default');

                return (
                    <div
                        key={component.path}
                        data-portal-component-type={component.type}
                        data-portal-component={component.path}
                        className={className}
                        data-th-remove="tag"
                    >
                        {component.type === 'image' && (
                            <Image
                                {...components.find(
                                    ({ path }) => path === component.path
                                )}
                            />
                        )}
                        {component.type === 'layout' && (
                            <DynamicRegions
                                regions={component.regions}
                                components={components}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DynamicRegions;
