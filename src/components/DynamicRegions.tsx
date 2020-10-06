import React from 'react';
import { Component } from '../types/content-types/_schema';
import { Region } from '../types/content-types/_schema';
import { LinkPanelWithBackgroundPart } from '../types/content-types/_schema';
import { PartType, Regions, Text, Image } from '../types/content-types/_schema';
import Picture from '../components/part-components/image/Image';
import { BEM } from '../utils/bem';
import { LinkPanelWithBackground } from './part-components/link-panel-with-background/LinkPanelWithBackground';
import htmlReactParser from 'html-react-parser';
import './DynamicRegions.less';

interface RegionsProps {
    regions: Regions;
    pageComponents: Component[];
}

const bem = BEM('region');

const DynamicRegions = (props: RegionsProps) => {
    const regions = props.regions || [];
    const pageComponents = props.pageComponents || [];
    return (
        <>
            {Object.values(regions).map((region, i) => (
                <DynamicRegion
                    key={region.name}
                    region={region}
                    pageComponents={pageComponents}
                />
            ))}
        </>
    );
};

interface RegionProps {
    region: Region;
    pageComponents: Component[];
}

export const DynamicRegion = (props: RegionProps) => {
    const { region, pageComponents } = props;
    const regionComponents = region.components || [];
    const { name } = region;

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

                            // Dynamic parts
                            part: {
                                [PartType.LinkPanelWithBackground]: (
                                    <LinkPanelWithBackground
                                        {...(component as LinkPanelWithBackgroundPart)}
                                    />
                                ),
                            }[regionComponent.descriptor] || (
                                <div>{`Unimplemented part: ${regionComponent.descriptor}`}</div>
                            ),

                            // Recursive layouts
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

const getClass = (descriptor?: string) =>
    ({
        'no.nav.navno:main': bem('main'),
        'no.nav.navno:main-1-col': bem('main-1-col'),
        'no.nav.navno:search': bem('search'),
    }[descriptor] || bem('default'));

export default DynamicRegions;
