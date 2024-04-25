import React from 'react';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { ComponentType } from 'types/component-props/_component-common';
import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutVersion } from 'utils/useLayoutVersion';

import { LenkeInline } from 'components/_common/lenke/LenkeInline';
import { classNames } from 'utils/classnames';

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
    if (!region) {
        return [];
    }

    return region.components.reduce<Anchor[]>((acc, component) => {
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
    }, []);
};

export const SectionNavigation = ({ introRegion, contentRegion }: SectionNavigationProps) => {
    const { language, type } = usePageContentProps();
    const layoutVersion = useLayoutVersion(type);
    const introAnchors = getAnchorsFromComponents(introRegion);
    const contentAnchors = getAnchorsFromComponents(contentRegion);
    const allAnchors = [...introAnchors, ...contentAnchors];

    if (allAnchors.length === 0) {
        return null;
    }

    console.log(layoutVersion);

    const getLabels = translator('sectionNavigation', language);

    const versionStyleClass =
        layoutVersion === '1' ? styles.sectionNavigationV1 : styles.sectionNavigationV2;

    const lenkeIkon = layoutVersion === '2' ? <ArrowDownRightIcon /> : null;

    return (
        <ul
            aria-label={getLabels('navigationLabel')}
            className={classNames(styles.sectionNavigation, versionStyleClass)}
        >
            {allAnchors.map((anchor) => (
                <li key={anchor.anchorId}>
                    <LenkeInline
                        href={`#${anchor.anchorId}`}
                        analyticsEvent={AnalyticsEvents.NAVIGATION}
                        analyticsLinkGroup={'Innhold'}
                        analyticsComponent={'Hopp til underkapittel'}
                        analyticsLabel={anchor.title}
                    >
                        {lenkeIkon}
                        {anchor.title}
                    </LenkeInline>
                </li>
            ))}
        </ul>
    );
};
