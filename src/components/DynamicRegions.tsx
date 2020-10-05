import React from 'react';
import { Component, Regions } from '../types/content-types/_schema';
import Image from '../components/part-components/image/Image';
import { BEM } from '../utils/bem';
import htmlReactParser from 'html-react-parser';
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
                        {{
                            text: <ParsedHtml value={component.text} />,
                            image: (
                                <Image
                                    {...components.find(
                                        ({ path }) => path === component.path
                                    )}
                                />
                            ),
                            part: {
                                'no.nav.navno:breaking-news': (
                                    <div>Breaking news</div>
                                ),
                            }[component.descriptor] || (
                                <div>{`Unimplemented part: ${component.descriptor}`}</div>
                            ),
                            layout: (
                                <DynamicRegions
                                    regions={component.regions}
                                    components={components}
                                />
                            ),
                        }[component.type] || (
                            <div>{`Unimplemented type: ${component.type}`}</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export const ParsedHtml = (text: { value: string }) => {
    return <>{htmlReactParser(text.value)}</>;
};

export default DynamicRegions;
