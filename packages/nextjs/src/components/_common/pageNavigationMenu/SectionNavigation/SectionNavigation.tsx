import React from 'react';
import { ComponentType } from 'types/component-props/_component-common';
import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { Language, translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { getAnchorId } from 'components/_common/relatedSituations/RelatedSituations';
import { PageNavigationMenu } from 'components/_common/pageNavigationMenu/PageNavigationMenu';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';

type SectionNavigationProps = {
    ariaLabel: string;
    introRegion?: RegionProps<'intro'>;
    contentRegion?: RegionProps<'content'>;
    className?: string;
};

const getAnchorsFromComponents = (language: Language, region?: RegionProps) => {
    if (!region) {
        return [];
    }

    const getStringPart = translator('related', language);
    const defaultTitle = getStringPart('otherOffers');

    return region.components.reduce<AnchorLink[]>((acc, component) => {
        if (component.type !== ComponentType.Part) {
            return acc;
        }

        if (component.descriptor === PartType.Header && component.config?.titleTag === 'h3') {
            const { anchorId, title } = component.config;
            return anchorId && title ? [...acc, { anchorId, linkText: title }] : acc;
        }

        if (component.descriptor === PartType.RelatedSituations) {
            const actualTitle = component.config?.title || defaultTitle;
            return [
                ...acc,
                {
                    anchorId: getAnchorId(actualTitle),
                    linkText: actualTitle,
                    isPartRelatedSituations: true,
                },
            ];
        }

        return acc;
    }, []);
};

export const SectionNavigation = ({
    ariaLabel,
    introRegion,
    contentRegion,
    className,
}: SectionNavigationProps) => {
    const { language } = usePageContentProps();
    const introAnchors = getAnchorsFromComponents(language, introRegion);
    const contentAnchors = getAnchorsFromComponents(language, contentRegion);
    const allAnchors = [...introAnchors, ...contentAnchors];

    if (allAnchors.length === 0) {
        return null;
    }

    if (allAnchors.length === 1 && allAnchors[0].isPartRelatedSituations) {
        return null;
    }

    return (
        <PageNavigationMenu
            anchorLinks={allAnchors}
            analyticsComponent="Hopp til underkapittel"
            ariaLabel={ariaLabel}
            className={className}
        />
    );
};
