import React from 'react';
import { DynamicRegion } from '../../../types/content-types/_schema';
import { PartType, DynamicRegions } from '../../../types/content-types/_schema';
import { BEM } from '../../../utils/bem';
import { LinkPanel } from '../../part-components/_dynamic/link-panel/LinkPanel';
import { DynamicRegionConfig } from '../../../types/content-types/_dynamic/_components';
import { DynamicGlobalComponent } from '../../../types/content-types/_dynamic/_components';
import { DynamicText } from '../../../types/content-types/_dynamic/text';
import { DynamicImage } from '../../../types/content-types/_dynamic/image';
import { Text } from '../../part-components/_dynamic/text/Text';
import Image from '../../part-components/_dynamic/image/Image';
import { DynamicLinkPanel } from '../../../types/content-types/_dynamic/link-panel';
import './DynamicRegions.less';

interface RegionsProps {
    dynamicRegions: DynamicRegions;
    dynamicConfig?: DynamicRegionConfig;
    dynamicGlobalComponents: DynamicGlobalComponent[];
}

const bem = BEM('region');
const Regions = (props: RegionsProps) => {
    const dynamicConfig = props.dynamicConfig;
    const dynamicRegions = props.dynamicRegions || [];
    const dynamicGlobalComponents = props.dynamicGlobalComponents || [];

    return (
        <>
            {Object.values(dynamicRegions).map((region, i) => {
                return (
                    <Region
                        key={region.name}
                        dynamicKey={i}
                        dynamicRegion={region}
                        dynamicConfig={dynamicConfig}
                        dynamicGlobalComponents={dynamicGlobalComponents}
                    />
                );
            })}
        </>
    );
};

interface RegionProps {
    dynamicKey: number;
    dynamicRegion: DynamicRegion;
    dynamicConfig?: DynamicRegionConfig;
    dynamicGlobalComponents: DynamicGlobalComponent[];
}

export const Region = (props: RegionProps) => {
    const { dynamicRegion, dynamicGlobalComponents, dynamicConfig } = props;
    const regionComponents = dynamicRegion.components || [];
    const { name } = dynamicRegion;

    const dynamicStyle = {
        ...(dynamicConfig?.distribution && {
            flex: `${dynamicConfig.distribution.split('-')[props.dynamicKey]}`,
        }),
    };

    return (
        <div
            key={name}
            style={dynamicStyle}
            data-portal-region={name}
            className={`${bem()} ${bem(name)}`}
        >
            {regionComponents.map((dynamicRegionComponent) => {
                const className = getClass(dynamicRegionComponent.descriptor);
                const component = dynamicGlobalComponents.find(
                    ({ path }) => path === dynamicRegionComponent.path
                );

                const dynamicStyle = {
                    ...(dynamicRegionComponent?.config?.margin && {
                        margin: `${dynamicRegionComponent?.config?.margin}`,
                    }),
                };

                return (
                    <div
                        key={dynamicRegionComponent.path}
                        style={dynamicStyle}
                        data-portal-component-type={dynamicRegionComponent.type}
                        data-portal-component={dynamicRegionComponent.path}
                        className={`${bem()} ${className}`}
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
                                <Regions
                                    dynamicConfig={
                                        dynamicRegionComponent.config
                                    }
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

const getClass = (descriptor?: string, config?: { distribution: string }) =>
    ({
        'no.nav.navno:main': bem('main'),
        'no.nav.navno:main-1-col': bem('main-1-col'),
        'no.nav.navno:dynamic-2-col': bem('dynamic-2-col'),
        'no.nav.navno:dynamic-3-col': bem('dynamic-3-col'),
        'no.nav.navno:dynamic-4-col': bem('dynamic-4-col'),
    }[descriptor] || bem('default'));

export default Regions;
