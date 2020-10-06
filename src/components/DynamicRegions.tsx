import React from 'react';
import { Component } from '../types/content-types/_schema';
import { PartType, Regions, Text, Image } from '../types/content-types/_schema';
import Picture from '../components/part-components/image/Image';
import { BEM } from '../utils/bem';
import htmlReactParser from 'html-react-parser';
import './DynamicRegions.less';

interface RegionsProps {
    regions: Regions;
    pageComponents: Component[];
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

export const DynamicRegion = (props: RegionProps) => {
    const { name, pageComponents, regions } = props;
    const regionComponents = regions[name].components || [];

    return (
        <div key={name} data-portal-region={name} className={bem(name)}>
            {regionComponents.map((regionComponent) => {
                const className = getClass(regionComponent.descriptor);
                const component = pageComponents.find(
                    ({ path }) => path === regionComponent.path
                );

                return (
                    <div
                        key={regionComponent.path}
                        data-portal-component-type={regionComponent.type}
                        data-portal-component={regionComponent.path}
                        className={className}
                        data-th-remove="tag"
                    >
                        {{
                            text: <Html {...(component as Text)} />,
                            image: <Picture {...(component as Image)} />,
                            part: {
                                [PartType.BreakingNews]: (
                                    <div>Breaking news</div>
                                ),
                            }[regionComponent.descriptor] || (
                                <div>{`Unimplemented part: ${regionComponent.descriptor}`}</div>
                            ),
                            layout: (
                                <DynamicRegions
                                    regions={regionComponent.regions}
                                    pageComponents={pageComponents}
                                />
                            ),
                        }[regionComponent.type] || (
                            <div>{`Unimplemented type: ${regionComponent.type}`}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

// Utils
export const Html = ({ text }: Text) => {
    const value = text.value;
    return <>{value && htmlReactParser(value)}</>;
};

const getClass = (descriptor: string) =>
    ({
        'no.nav.navno:main': bem('main'),
        'no.nav.navno:main-1-col': bem('main-1-col'),
        'no.nav.navno:search': bem('search'),
    }[descriptor] || bem('default'));

export default DynamicRegions;
