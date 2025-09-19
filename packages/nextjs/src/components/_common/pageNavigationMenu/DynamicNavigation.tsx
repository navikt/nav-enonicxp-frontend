import React, { useEffect, useId, useMemo, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { BodyLong, Heading } from '@navikt/ds-react';
import { FileTextIcon } from '@navikt/aksel-icons';
import { ContentProps } from 'types/content-props/_content-common';
import { PartType } from 'types/component-props/parts';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { AnalyticsEvents } from 'utils/analytics';
import { classNames } from 'utils/classnames';
import { getAnchorId } from 'components/_common/relatedSituations/RelatedSituations';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';

import style from './DynamicNavigation.module.scss';

const HEADING_TARGET_RATIO = 0.2; // Prosentandel av viewport-høyden for å markere overskrift som aktiv

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    pageProps: ContentProps;
    title?: string;
    className?: string;
};

export const DynamicNavigation = ({ anchorLinks = [], pageProps, title, className }: Props) => {
    const { language } = usePageContentProps();

    const headingId = `heading-dynamic-navigation-menu-${useId()}`;
    const analyticsComponent = 'Dynamisk meny for intern-navigasjon';

    const [activeAnchor, setActiveAnchor] = useState<string | null>(null);
    const clickedAnchorRef = useRef<string | null>(null);
    const clickedAnchorResetTimerRef = useRef<number | undefined>(undefined);

    const links = useMemo(() => getValidLinks(anchorLinks), [anchorLinks]);
    const pageContentComponents = useMemo(
        () => (pageProps as any)?.page?.regions?.pageContent?.components as any[] | undefined,
        [pageProps]
    );

    // Grupper H2- og H3-overskrifter basert på sideinnholdet for å bygge hierarkisk meny
    const groupedLinks = useMemo(
        () =>
            links.map((h2) => {
                const section = pageContentComponents?.find(
                    (component) => component?.config?.anchorId === h2.anchorId
                );

                const introComponents: any[] = section?.regions?.intro?.components ?? [];
                const contentComponents: any[] = section?.regions?.content?.components ?? [];
                const sectionComponents: any[] = [...introComponents, ...contentComponents];

                const headerH3: AnchorLink[] = sectionComponents
                    .filter(
                        (component) =>
                            component?.descriptor === PartType.Header &&
                            component?.config?.titleTag === 'h3' &&
                            component?.config?.anchorId &&
                            component?.config?.title
                    )
                    .map((component) => ({
                        anchorId: component.config.anchorId as string,
                        linkText: component.config.title as string,
                    }));

                const relatedSituationsH3: AnchorLink[] = sectionComponents
                    .filter((component) => component?.descriptor === PartType.RelatedSituations)
                    .map((component) => {
                        const linkText = (
                            (component?.config?.title as string) ||
                            translator('related', language)('otherOffers')
                        ).trim();
                        return {
                            anchorId: getAnchorId(linkText),
                            linkText,
                        } as AnchorLink;
                    });

                const h3: AnchorLink[] = [...headerH3, ...relatedSituationsH3];

                return { h2, h3 };
            }),
        [links, pageContentComponents, language]
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Flat liste over overskrifter: H2 etterfulgt av sine H3-er, hver med eksisterende DOM-element
        const headingItems = groupedLinks
            .flatMap((group) => [group.h2.anchorId, ...group.h3.map((link) => link.anchorId)])
            .map((id) => ({ id, el: document.getElementById(id) as HTMLElement }))
            .filter((item) => !!item.el);
        if (headingItems.length === 0) return;

        const visibleHeadings: Set<string> = new Set();
        let currentDocHeight = Math.floor(document.body.clientHeight);

        // Observer H2- og H3-elementer på siden og marker den nærmeste synlige som aktiv
        const createObserver = (documentHeight: number) =>
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const target = entry.target as HTMLElement;
                        const id = target.id;
                        if (!id) return;
                        if (entry.isIntersecting) {
                            visibleHeadings.add(id);
                        } else {
                            visibleHeadings.delete(id);
                        }
                    });

                    // Finn aktiv overskrift: iterer i hierarkisk rekkefølge og ta den siste som er synlig
                    let nextActive: string | null = null;
                    for (const item of headingItems) {
                        if (visibleHeadings.has(item.id)) nextActive = item.id;
                    }

                    // Lås aktiv overskrift frem til den er synlig dersom vi scroller mot et klikket mål - hvis ikke, oppdater aktiv overskrift ved scroll
                    const clicked = clickedAnchorRef.current;
                    if (clicked) {
                        if (nextActive === clicked) {
                            clickedAnchorRef.current = null;
                            setActiveAnchor((prev) => (prev !== nextActive ? nextActive : prev));
                        }
                    } else {
                        setActiveAnchor((prev) => (prev !== nextActive ? nextActive : prev));
                    }
                },
                {
                    // Bruk documentHeight som øvre rootMargin slik at overskrifter over viewport fortsatt regnes som "synlige"
                    // og en negativ nedre rootMargin for å foretrekke den nærmeste overskriften mot toppen
                    rootMargin: `${documentHeight}px 0px -${(1 - HEADING_TARGET_RATIO) * 100}% 0px`,
                    threshold: 0,
                }
            );

        let observer = createObserver(currentDocHeight);
        headingItems.forEach((item) => observer.observe(item.el));

        // Erstatter gjeldende IntersectionObserver ved endret dokumenthøyde for å sette korrekt rootMargin
        const onResize = debounce(() => {
            const newHeight = Math.floor(document.body.clientHeight);
            if (newHeight === currentDocHeight) return;

            currentDocHeight = newHeight;
            observer.disconnect();
            observer = createObserver(newHeight);
            headingItems.forEach((item) => observer.observe(item.el));
        }, 150);

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            onResize.cancel();
            observer.disconnect();
        };
    }, [groupedLinks]);

    // Sikre at vi ikke hopper mellom aktive overskrifter ved automatisk scroll til hash i URL
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const applyHashScroll = () => {
            const hash = window.location.hash.slice(1);
            if (!hash) return;

            const isValidHeading = groupedLinks.some(
                (g) => g.h2.anchorId === hash || g.h3.some((s) => s.anchorId === hash)
            );
            if (!isValidHeading) return;

            window.clearTimeout(clickedAnchorResetTimerRef.current);
            clickedAnchorRef.current = hash;
            setActiveAnchor(hash);

            // Fallback dersom IntersectionObserver ikke trigger slipper vi låsen etter en kort periode slik at aktiv overskrift kan endres igjen
            clickedAnchorResetTimerRef.current = window.setTimeout(() => {
                clickedAnchorRef.current = null;
                clickedAnchorResetTimerRef.current = undefined;
            }, 1000);
        };

        // Kjør ved første innlasting for å håndtere eksisterende hash i URL
        if (window.location.hash) {
            applyHashScroll();
        }

        window.addEventListener('popstate', applyHashScroll);
        window.addEventListener('hashchange', applyHashScroll);

        return () => {
            window.removeEventListener('popstate', applyHashScroll);
            window.removeEventListener('hashchange', applyHashScroll);
            window.clearTimeout(clickedAnchorResetTimerRef.current);
        };
    }, [groupedLinks]);

    // If no links found, show editor help
    if (links.length === 0) {
        return (
            <EditorHelp text="Kunne ikke lage lenker til intern navigasjon. Enten finnes det ingen Innholdsseksjoner på denne siden, eller alle er satt til 'ikke vis under innhold'. Hvis siden nettopp er opprettet, forsøk å klikke 'marker som klar' eller last hele siden på nytt." />
        );
    }

    return (
        <nav
            aria-labelledby={headingId}
            className={classNames(style.pageNavigationMenu, className)}
        >
            <Heading size="xsmall" id={headingId} className={style.heading}>
                <FileTextIcon aria-hidden={true} className={style.headingIcon} />
                {title}
            </Heading>
            <ul className={style.list}>
                {groupedLinks.map(({ h2, h3 }) => {
                    const isH2Active = activeAnchor === h2.anchorId;
                    const isChildActive = h3.some((s) => s.anchorId === activeAnchor);
                    const isExpanded = isH2Active || isChildActive;
                    const submenuId = `${h2.anchorId}-submenu`;
                    return (
                        <li key={h2.anchorId}>
                            <LenkeBase
                                href={`#${h2.anchorId}`}
                                analyticsEvent={AnalyticsEvents.NAVIGATION}
                                analyticsLinkGroup={'Innhold'}
                                analyticsComponent={analyticsComponent}
                                analyticsLabel={h2.linkText}
                                className={style.link}
                                aria-current={isH2Active ? 'true' : undefined}
                                aria-expanded={
                                    h3.length > 0 ? (isExpanded ? 'true' : 'false') : undefined
                                }
                                aria-controls={h3.length > 0 ? submenuId : undefined}
                            >
                                <BodyLong as="span" size="small" className={style.linkText}>
                                    {h2.linkText}
                                </BodyLong>
                            </LenkeBase>

                            {h3.length > 0 && (
                                <ul
                                    className={classNames(style.list, !isExpanded && 'sr-only')}
                                    id={submenuId}
                                >
                                    {h3.map((sub) => (
                                        <li key={sub.anchorId}>
                                            <LenkeBase
                                                href={`#${sub.anchorId}`}
                                                analyticsEvent={AnalyticsEvents.NAVIGATION}
                                                analyticsLinkGroup={'Innhold'}
                                                analyticsComponent={analyticsComponent}
                                                analyticsLabel={sub.linkText}
                                                className={style.link}
                                                aria-current={
                                                    activeAnchor === sub.anchorId
                                                        ? 'true'
                                                        : undefined
                                                }
                                            >
                                                <BodyLong
                                                    as="span"
                                                    size="small"
                                                    className={style.linkText}
                                                >
                                                    {sub.linkText}
                                                </BodyLong>
                                            </LenkeBase>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
