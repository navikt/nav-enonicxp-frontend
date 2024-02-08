import { ComponentType } from 'types/component-props/_component-common';
import { RegionProps } from 'types/component-props/layouts';
import { PartType } from 'types/component-props/parts';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';

import styles from './SectionNavigation.module.scss';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AnalyticsEvents } from 'utils/amplitude';

type SectionNavigationProps = {
    introRegion: RegionProps<'intro'>;
    contentRegion: RegionProps<'content'>;
};

type Anchor = {
    anchorId: string;
    title: string;
};

const getAnchorsFromComponents = (components: RegionProps['components']) => {
    return components
        .reduce((acc, component) => {
            if (
                component.type === ComponentType.Part &&
                component.descriptor === PartType.Header &&
                component.config?.titleTag === 'h3'
            ) {
                acc.push({
                    anchorId: component.config.anchorId as string,
                    title: component.config.title as string,
                });
            }
            return acc;
        }, [] as Anchor[])
        .filter((anchor) => !!anchor.anchorId && !!anchor.title);
};

export const SectionNavigation = ({
    introRegion,
    contentRegion,
}: SectionNavigationProps) => {
    const { language } = usePageConfig();
    const introAnchors = getAnchorsFromComponents(introRegion.components);
    const contentAnchors = getAnchorsFromComponents(contentRegion.components);
    const allAnchors = [...introAnchors, ...contentAnchors];

    const getLabels = translator('sectionNavigation', language);

    if (allAnchors.length === 0) {
        return null;
    }

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
