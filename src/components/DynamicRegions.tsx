import React from 'react';
import { Region } from '../types/content-types/_schema';
import { PartType, Regions } from '../types/content-types/_schema';
import { BEM } from '../utils/bem';
import { LinkPanelWithBackground } from './part-components/_dynamic/link-panel-with-background/LinkPanelWithBackground';
import { DynamicGlobalComponent } from '../types/dynamic-components/_components';
import { DynamicLinkPanelWithBackground } from '../types/dynamic-components/link-panel-with-background';
import { DynamicText } from '../types/dynamic-components/text';
import { DynamicImage } from '../types/dynamic-components/image';
import { Text } from './part-components/_dynamic/text/Text';
import Image from './part-components/_dynamic/image/Image';
import './DynamicRegions.less';

interface RegionsProps {
    regions: Regions;
    pageComponents: DynamicGlobalComponent[];
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
    pageComponents: DynamicGlobalComponent[];
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
                            text: <Text {...(component as DynamicText)} />,
                            image: <Image {...(component as DynamicImage)} />,

                            // Dynamic parts
                            part: {
                                [PartType.LinkPanelWithBackground]: (
                                    <LinkPanelWithBackground
                                        {...(component as DynamicLinkPanelWithBackground)}
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

const getClass = (descriptor?: string) =>
    ({
        'no.nav.navno:main': bem('main'),
        'no.nav.navno:main-1-col': bem('main-1-col'),
        'no.nav.navno:search': bem('search'),
    }[descriptor] || bem('default'));

export default DynamicRegions;
