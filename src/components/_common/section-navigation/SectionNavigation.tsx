import React from 'react';
import { ComponentType } from 'types/component-props/_component-common';
import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { Language, translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { AnalyticsEvents } from 'utils/amplitude';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { getAnchorId } from 'components/_common/relatedSituations/RelatedSituations';

import styles from './SectionNavigation.module.scss';

type SectionNavigationProps = {
    introRegion?: RegionProps<'intro'>;
    contentRegion?: RegionProps<'content'>;
};

type Anchor = {
    anchorId: string;
    title: string;
    isPartRelatedSituations?: boolean;
};

const getAnchorsFromComponents = (language: Language, region?: RegionProps) => {
    if (!region) {
        return [];
    }

    const getStringPart = translator('related', language);
    const defaultTitle = getStringPart('otherOffers');

    return region.components.reduce<Anchor[]>((acc, component) => {
        if (component.type !== ComponentType.Part) {
            return acc;
        }

        if (component.descriptor === PartType.Header && component.config?.titleTag === 'h3') {
            const { anchorId, title } = component.config;
            return anchorId && title ? [...acc, { anchorId, title }] : acc;
        }

        if (component.descriptor === PartType.RelatedSituations) {
            const actualTitle = component.config?.title || defaultTitle;
            return [
                ...acc,
                {
                    anchorId: getAnchorId(actualTitle),
                    title: actualTitle,
                    isPartRelatedSituations: true,
                },
            ];
        }

        return acc;
    }, []);
};

export const SectionNavigation = ({ introRegion, contentRegion }: SectionNavigationProps) => {
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

    const getLabels = translator('sectionNavigation', language);

    return (
        <ul aria-label={getLabels('navigationLabel')} className={styles.sectionNavigation}>
            {allAnchors.map((anchor) => (
                <li key={anchor.anchorId}>
                    <LenkeInline
                        href={`#${anchor.anchorId}`}
                        analyticsEvent={AnalyticsEvents.NAVIGATION}
                        analyticsLinkGroup={'Innhold'}
                        analyticsComponent={'Hopp til underkapittel'}
                        analyticsLabel={anchor.title}
                    >
                        {anchor.title}
                    </LenkeInline>
                </li>
            ))}
        </ul>
    );
};
