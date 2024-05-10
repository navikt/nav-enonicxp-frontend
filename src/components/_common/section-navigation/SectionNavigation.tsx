import React from 'react';
import { ComponentType } from 'types/component-props/_component-common';
import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { PageNavigationMenu } from '../page-navigation-menu/PageNavigationMenu';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';

type SectionNavigationProps = {
    introRegion?: RegionProps<'intro'>;
    contentRegion?: RegionProps<'content'>;
};

const getAnchorsFromComponents = (region?: RegionProps) => {
    if (!region) {
        return [];
    }

    return region.components.reduce<AnchorLink[]>((acc, component) => {
        if (
            component.type === ComponentType.Part &&
            component.descriptor === PartType.Header &&
            component.config &&
            component.config.titleTag === 'h3' &&
            component.config.anchorId &&
            component.config.title
        ) {
            acc.push({
                anchorId: component.config.anchorId as string,
                linkText: component.config.title as string,
            });
        }
        return acc;
    }, []);
};

export const SectionNavigation = ({ introRegion, contentRegion }: SectionNavigationProps) => {
    const { language } = usePageContentProps();
    const introAnchors = getAnchorsFromComponents(introRegion);
    const contentAnchors = getAnchorsFromComponents(contentRegion);
    const allAnchors = [...introAnchors, ...contentAnchors];

    if (allAnchors.length === 0) {
        return null;
    }

    const getLabels = translator('sectionNavigation', language);

    return (
        <PageNavigationMenu
            anchorLinks={allAnchors}
            ariaLabel={getLabels('navigationLabel')}
            title="Test"
        />
    );
};
