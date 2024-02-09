import React from 'react';
import { ComponentType } from 'types/component-props/_component-common';
import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AnalyticsEvents } from 'utils/amplitude';

import styles from './SectionNavigation.module.scss';

type SectionNavigationProps = {
    introRegion?: RegionProps<'intro'>;
    contentRegion?: RegionProps<'content'>;
};

type Anchor = {
    anchorId: string;
    title: string;
};

const getAnchorsFromComponents = (region?: RegionProps) => {
    return region
        ? region.components.reduce<Anchor[]>((acc, component) => {
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
                      title: component.config.title as string,
                  });
              }
              return acc;
          }, [])
        : [];
};

export const SectionNavigation = ({
    introRegion,
    contentRegion,
}: SectionNavigationProps) => {
    const { language } = usePageConfig();
    const introAnchors = getAnchorsFromComponents(introRegion);
    const contentAnchors = getAnchorsFromComponents(contentRegion);
    const allAnchors = [...introAnchors, ...contentAnchors];

    if (allAnchors.length === 0) {
        return null;
    }

    const getLabels = translator('sectionNavigation', language);

    return (
        <ul
            aria-label={getLabels('navigationLabel')}
            className={styles.sectionNavigation}
        >
            {allAnchors.map((anchor) => (
                <li key={anchor.anchorId}>
                    <LenkeBase
                        href={`#${anchor.anchorId}`}
                        analyticsEvent={AnalyticsEvents.NAVIGATION}
                        analyticsLinkGroup={'Innhold'}
                        analyticsComponent={'Hopp til underkapittel'}
                        analyticsLabel={anchor.title}
                    >
                        {anchor.title}
                    </LenkeBase>
                </li>
            ))}
        </ul>
    );
};
