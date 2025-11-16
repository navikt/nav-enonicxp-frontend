import React, { useEffect, useId, useMemo, useState, useRef, ForwardedRef } from 'react';
import debounce from 'lodash.debounce';
import { BodyShort, Heading, Button } from '@navikt/ds-react';
import { ChevronDownUpIcon, ChevronUpDownIcon, FileTextIcon } from '@navikt/aksel-icons';
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

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    pageProps: ContentProps;
    title: string;
    className?: string;
    onLinkClick?: () => void;
    canExpandAll?: boolean;
    forceExpandAll?: boolean;
    onToggleExpandAll?: () => void;
};

export const DynamicNavigation = React.forwardRef<HTMLDivElement, Props>(function DynamicNavigation(
    {
        anchorLinks = [],
        pageProps,
        title,
        className,
        onLinkClick,
        canExpandAll = false,
        forceExpandAll = false,
        onToggleExpandAll,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
) {
    const { language } = usePageContentProps();

    const headingId = `heading-dynamic-navigation-menu-${useId()}`;
    const analyticsComponent = 'Dynamisk meny for intern-navigasjon';

    const [activeAnchors, setActiveAnchors] = useState<string[]>([]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const lastScrolledToRef = useRef<string | null>(null);

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

    // Overvåk scroll-posisjon for å aktivere/deaktivere overskrifter i menyen
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Flat liste over overskrifter: H2 etterfulgt av sine H3-er, hver med eksisterende DOM-element
        const headingItems = groupedLinks
            .flatMap((group) => [group.h2.anchorId, ...group.h3.map((link) => link.anchorId)])
            .map((id) => ({ id, el: document.getElementById(id) as HTMLElement }))
            .filter((item) => !!item.el);
        if (headingItems.length === 0) return;

        const checkActiveAnchors = () => {
            // Toleransen for å aktivere overskrifter når den er innenfor angitt verdi fra toppen eller bunnen
            const DEFAULT_SCROLL_TOLERANCE_PX = 75;
            const MAX_SCREEN_RATIO = 0.1;
            const SCROLL_TOLERANCE_PX = Math.min(
                DEFAULT_SCROLL_TOLERANCE_PX,
                Math.round(window.innerHeight * MAX_SCREEN_RATIO)
            );

            const activeIds: string[] = [];
            let closestAbove: { id: string; rect: DOMRect } | undefined;
            for (const h of headingItems) {
                const rect = h.el.getBoundingClientRect();
                if (rect.top < SCROLL_TOLERANCE_PX) {
                    if (!closestAbove || rect.top > closestAbove.rect.top) {
                        closestAbove = { id: h.id, rect };
                    }
                }

                // Hvis det ikke finnes noen overskrift over, befinner vi oss på toppen av siden og skal ikke ha noen aktive overskrifter
                if (closestAbove) {
                    if (
                        rect.bottom > SCROLL_TOLERANCE_PX &&
                        rect.top < window.innerHeight - SCROLL_TOLERANCE_PX
                    ) {
                        activeIds.push(h.id);
                    }
                }
            }

            // Legg til den endelige closestAbove i listen over aktive overskrifter
            if (closestAbove) {
                activeIds.push(closestAbove.id);
            }

            setActiveAnchors(() => activeIds);
        };

        window.addEventListener('scroll', checkActiveAnchors, { passive: true });

        const handleResize = debounce(() => checkActiveAnchors(), 120);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', checkActiveAnchors);
            window.removeEventListener('resize', handleResize);
            handleResize.cancel();
        };
    }, [groupedLinks]);

    // Scroll til aktive overskrifter i innholdsfortegnelsen hvis de ikke er synlige
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const targetId = activeAnchors[0];
        if (!targetId || lastScrolledToRef.current === targetId) return;

        const container = containerRef.current || (ref && 'current' in ref ? ref.current : null);
        if (!container) return;

        const link: HTMLElement | null = container.querySelector(
            `a[href="#${CSS.escape(targetId)}"]`
        );
        if (!link) return;

        // Toleransen for å avgjøre om aktiv overskrift er innenfor innholdsfortegnelsen synlige område
        const DEFAULT_SCROLL_TOLERANCE_PX = 250;
        const MAX_SCREEN_RATIO = 0.2;
        const SCROLL_TOLERANCE_PX = Math.min(
            DEFAULT_SCROLL_TOLERANCE_PX,
            Math.round(window.innerHeight * MAX_SCREEN_RATIO)
        );

        const cRect = container.getBoundingClientRect();
        const lRect = link.getBoundingClientRect();
        const isAbove = lRect.top < cRect.top + SCROLL_TOLERANCE_PX;
        const isBelow = lRect.bottom > cRect.bottom - SCROLL_TOLERANCE_PX;
        if (isAbove || isBelow) {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            container.scrollTo({
                top: link.offsetTop - container.clientHeight / 2,
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
            });
            lastScrolledToRef.current = targetId;
        }
    }, [activeAnchors, ref]);

    // If no links found, show editor help
    if (links.length === 0) {
        return (
            <EditorHelp text="Kunne ikke lage lenker til intern navigasjon. Enten finnes det ingen Innholdsseksjoner på denne siden, eller alle er satt til 'ikke vis under innhold'. Hvis siden nettopp er opprettet, forsøk å klikke 'marker som klar' eller last hele siden på nytt." />
        );
    }

    return (
        <nav
            ref={ref || containerRef}
            aria-labelledby={headingId}
            className={classNames(style.pageNavigationMenu, className)}
        >
            <Heading level="2" size="xsmall" id={headingId} className={style.heading}>
                <FileTextIcon aria-hidden={true} className={style.headingIcon} />
                {title}
            </Heading>
            <ul className={style.list}>
                {groupedLinks.map(({ h2, h3 }) => {
                    const isH2Active = activeAnchors.includes(h2.anchorId);
                    const isChildActive = h3.some((s) => activeAnchors.includes(s.anchorId));
                    const isExpanded = forceExpandAll || isH2Active || isChildActive;
                    const submenuId = `${h2.anchorId}-submenu`;
                    return (
                        <li key={h2.anchorId}>
                            <LenkeBase
                                href={`#${h2.anchorId}`}
                                analyticsEvent={AnalyticsEvents.NAVIGATION}
                                analyticsLinkGroup={'Innhold'}
                                analyticsComponent={analyticsComponent}
                                analyticsLabel={h2.linkText}
                                className={classNames(
                                    style.link,
                                    isChildActive && style.childActive
                                )}
                                aria-current={isH2Active ? 'true' : undefined}
                                aria-expanded={
                                    h3.length > 0 ? (isExpanded ? 'true' : 'false') : undefined
                                }
                                aria-controls={h3.length > 0 ? submenuId : undefined}
                                onClick={() => onLinkClick?.()}
                            >
                                <BodyShort as="span" size="small" className={style.linkText}>
                                    {h2.linkText}
                                </BodyShort>
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
                                                    activeAnchors.includes(sub.anchorId)
                                                        ? 'true'
                                                        : undefined
                                                }
                                                tabIndex={isExpanded ? 0 : -1}
                                                onClick={() => onLinkClick?.()}
                                            >
                                                <BodyShort
                                                    as="span"
                                                    size="small"
                                                    className={style.linkText}
                                                >
                                                    {sub.linkText}
                                                </BodyShort>
                                            </LenkeBase>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
            {canExpandAll && (
                <Button
                    className={style.button}
                    icon={
                        forceExpandAll ? (
                            <ChevronDownUpIcon aria-hidden={true} />
                        ) : (
                            <ChevronUpDownIcon aria-hidden={true} />
                        )
                    }
                    onClick={onToggleExpandAll}
                    size="small"
                >
                    {forceExpandAll
                        ? 'Vis fokusert innholdsfortegnelse'
                        : 'Vis detaljert innholdsfortegnelse'}
                </Button>
            )}
        </nav>
    );
});
