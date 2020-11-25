import React from 'react';
import { ContentType, GlobalPageSchema } from 'types/content-types/_schema';
import { DynamicRegions, PartType } from 'types/content-types/_schema';
import { DynamicRegion } from 'types/content-types/_schema';
import { LinkPanel } from 'components/part-components/_dynamic/link-panel/LinkPanel';
import { DynamicText } from 'types/content-types/_dynamic/text';
import { DynamicImage } from 'types/content-types/_dynamic/image';
import { Text } from 'components/part-components/_dynamic/text/Text';
import Image from 'components/part-components/_dynamic/image/Image';
import { DynamicLinkPanel } from 'types/content-types/_dynamic/link-panel';
import Veilederpanel from 'components/part-components/_dynamic/veilederpanel/Veilederpanel';
import AlertStripe from 'components/part-components/_dynamic/alerstripe/Alerstripe';
import { DynamicSupervisorPanel } from 'types/content-types/_dynamic/supervisor-panel';
import { DynamicAlert } from 'types/content-types/_dynamic/alert';
import LesMerPanel from 'components/part-components/_dynamic/les-mer-panel/LesMerPanel';
import { DynamicReadMorePanel } from 'types/content-types/_dynamic/read-more-panel';
import { BEM } from 'utils/bem';
import { LinkPanels } from 'components/part-components/link-panels/LinkPanels';
import { DynamicRegionConfig } from 'types/content-types/_dynamic/_components';
import LinkLists from 'components/part-components/link-lists/LinkLists';
import MainPanels from 'components/part-components/main-panels/MainPanels';
import PageHeading from 'components/part-components/page-heading/PageHeading';
import { MainArticleLinkedListProps } from '../../part-components/main-article-linked-list/MainArticleLinkedList';
import { MainArticleLinkedList } from '../../part-components/main-article-linked-list/MainArticleLinkedList';
import { MenuListProps } from '../../part-components/menu-list/MenuList';
import { MenuList } from '../../part-components/menu-list/MenuList';
import { OfficeInformationProps } from 'types/content-types/office-information-props';
import { OfficeInformation } from '../../part-components/office-information/OfficeInformation';
import PageList from '../../part-components/page-list/PageList';
import { MainArticle } from '../../part-components/main-article/MainArticle';
import { ArticleProps } from '../../../types/content-types/main-article-chapter-props';
import { MainArticleProps } from '../../../types/content-types/main-article-props';
import './DynamicRegions.less';

const bem = BEM('region');

interface RegionsProps {
    dynamicRegions: DynamicRegions;
    dynamicConfig?: DynamicRegionConfig;
}

const Regions = (props: RegionsProps & GlobalPageSchema) => {
    const dynamicRegions = props.dynamicRegions || [];
    return (
        <>
            {Object.values(dynamicRegions).map((region, i) => (
                <Region
                    {...props}
                    key={region.name}
                    dynamicKey={i}
                    dynamicRegion={region}
                />
            ))}
        </>
    );
};

export interface RegionProps {
    dynamicKey: number;
    dynamicRegion: DynamicRegion;
    dynamicConfig?: DynamicRegionConfig;
}

export const Region = (props: RegionProps & GlobalPageSchema) => {
    const dynamicRegionComponents = props.dynamicRegion.components || [];
    const dynamicConfig = props.dynamicConfig;
    const { name } = props.dynamicRegion;
    const dynamicGlobalComponents =
        props.pageTemplate?.components || props.components;

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
            {dynamicRegionComponents.map((dynamicRegionComponent) => {
                const componentDescriptor = dynamicRegionComponent.descriptor;
                const component = dynamicGlobalComponents.find(
                    ({ path }) => path === dynamicRegionComponent.path
                );

                const part = component?.part;
                const descriptor = componentDescriptor || part?.descriptor;
                const className = getClass(descriptor);

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

                            part: {
                                // Dynamic parts with own content
                                [PartType.LinkPanel]: (
                                    <LinkPanel
                                        {...(component as DynamicLinkPanel)}
                                    />
                                ),
                                [PartType.SupervisorPanel]: (
                                    <Veilederpanel
                                        {...(component as DynamicSupervisorPanel)}
                                    />
                                ),
                                [PartType.Alert]: (
                                    <AlertStripe
                                        {...(component as DynamicAlert)}
                                    />
                                ),
                                [PartType.ReadMorePanel]: (
                                    <LesMerPanel
                                        {...(component as DynamicReadMorePanel)}
                                    />
                                ),

                                // Parts based on global content
                                [PartType.PageHeading]: (
                                    <PageHeading {...props} />
                                ),
                                [PartType.LinkPanels]: (
                                    <LinkPanels {...props} />
                                ),
                                [PartType.LinkLists]: <LinkLists {...props} />,
                                [PartType.MainPanels]: (
                                    <MainPanels {...props} />
                                ),
                                [PartType.PageList]: <PageList {...props} />,

                                // Main Article
                                [PartType.MainArticleLinkedList]: (
                                    <MainArticleLinkedList
                                        {...(props as MainArticleLinkedListProps)}
                                    />
                                ),
                                [PartType.MenuList]: (
                                    <MenuList {...(props as MenuListProps)} />
                                ),
                                [PartType.OfficeInformation]: (
                                    <OfficeInformation
                                        {...(props as RegionProps &
                                            OfficeInformationProps)}
                                    />
                                ),
                                [PartType.MainArticle]:
                                    props.__typename ===
                                    ContentType.MainArticleChapter ? (
                                        <MainArticle
                                            {...(props.data
                                                .article as ArticleProps)}
                                        />
                                    ) : (
                                        <MainArticle
                                            {...(props as MainArticleProps)}
                                        />
                                    ),

                                // Deprecated parts - remove after release
                                [PartType.Notifications]: <></>,
                                [PartType.BreakingNews]: <></>,
                                [PartType.PageCrumbs]: <></>,
                            }[descriptor] || (
                                <div className={bem('unimplemented')}>
                                    {`Unimplemented part: ${descriptor}`}
                                </div>
                            ),

                            // Recursive layouts
                            layout: (
                                <Regions
                                    {...props}
                                    dynamicConfig={
                                        dynamicRegionComponent.config
                                    }
                                    dynamicRegions={
                                        dynamicRegionComponent.regions
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
