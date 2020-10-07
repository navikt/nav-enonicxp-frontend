import React from 'react';
import { Region } from '../../../types/content-types/_schema';
import { PartType, Regions } from '../../../types/content-types/_schema';
import { BEM } from '../../../utils/bem';
import { LinkPanel } from '../../part-components/_dynamic/link-panel/LinkPanel';
import { DynamicGlobalComponent } from '../../../types/content-types/_dynamic/_components';
import { DynamicText } from '../../../types/content-types/_dynamic/text';
import { DynamicImage } from '../../../types/content-types/_dynamic/image';
import { Text } from '../../part-components/_dynamic/text/Text';
import Image from '../../part-components/_dynamic/image/Image';
import { DynamicLinkPanel } from '../../../types/content-types/_dynamic/link-panel';
import './DynamicRegions.less';

interface RegionsProps {
    dynamicRegions: Regions;
    dynamicGlobalComponents: DynamicGlobalComponent[];
}

const bem = BEM('region');

const DynamicRegions = (props: RegionsProps) => {
    const regions = props.dynamicRegions || [];
    const dynamicGlobalComponents = props.dynamicGlobalComponents || [];
    return (
        <>
            {Object.values(regions).map((region, i) => (
                <DynamicRegion
                    key={region.name}
                    region={region}
                    dynamicGlobalComponents={dynamicGlobalComponents}
                />
            ))}
        </>
    );
};

interface RegionProps {
    region: Region;
    dynamicGlobalComponents: DynamicGlobalComponent[];
}

export const DynamicRegion = (props: RegionProps) => {
    const { region, dynamicGlobalComponents } = props;
    const regionComponents = region.components || [];
    const { name } = region;

    return (
        <div key={name} data-portal-region={name} className={bem(name)}>
            {regionComponents.map((dynamicRegionComponent) => {
                const className = getClass(dynamicRegionComponent.descriptor);
                const component = dynamicGlobalComponents.find(
                    ({ path }) => path === dynamicRegionComponent.path
                );

                return (
                    <div
                        key={dynamicRegionComponent.path}
                        data-portal-component-type={dynamicRegionComponent.type}
                        data-portal-component={dynamicRegionComponent.path}
                        className={className}
                        data-th-remove="tag"
                    >
                        {{
                            text: <Text {...(component as DynamicText)} />,
                            image: <Image {...(component as DynamicImage)} />,

                            // Dynamic parts
                            part: {
                                [PartType.LinkPanel]: (
                                    <LinkPanel
                                        {...(component as DynamicLinkPanel)}
                                    />
                                ),
                            }[dynamicRegionComponent.descriptor] || (
                                <div className={bem('unimplemented')}>
                                    {`Unimplemented part: ${dynamicRegionComponent.descriptor}`}
                                </div>
                            ),

                            // Recursive layouts
                            layout: (
                                <DynamicRegions
                                    dynamicRegions={
                                        dynamicRegionComponent.regions
                                    }
                                    dynamicGlobalComponents={
                                        dynamicGlobalComponents
                                    }
                                />
                            ),
                        }[dynamicRegionComponent.type] || (
                            <div className={bem('unimplemented')}>
                                {`Unimplemented type: ${dynamicRegionComponent.type}`}
                            </div>
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
