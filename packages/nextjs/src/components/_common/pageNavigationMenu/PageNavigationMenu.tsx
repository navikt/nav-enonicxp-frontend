import React, { useId } from 'react';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { classNames } from 'utils/classnames';
import { AnalyticsEvents } from 'utils/amplitude';
import { EditorHelp } from '@/editor-tools/src/components/editor-help/EditorHelp';
import { PageNavigationDupeLinkWarning } from './PageNavigationDupeLinkWarning';

import style from './PageNavigationMenu.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    analyticsComponent?: string;
    title: string;
    isChapterNavigation?: boolean;
};

export const PageNavigationMenu = ({
    anchorLinks = [],
    analyticsComponent = 'Meny for intern-navigasjon',
    title,
    isChapterNavigation,
}: Props) => {
    const links = getValidLinks(anchorLinks);

    const headingId = `heading-page-navigation-menu-${useId()}`;
    const headingLevel = isChapterNavigation ? '2' : '3';

    if (links.length === 0) {
        return (
            <EditorHelp text="Kunne ikke lage lenker til intern navigasjon. Enten finnes det ingen Innholdsseksjoner på denne siden, eller alle er satt til 'ikke vis under innhold'. Hvis siden nettopp er opprettet, forsøk å klikke 'marker som klar' eller last hele siden på nytt." />
        );
    }

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div
                className={classNames(
                    style.pageNavigationMenu,
                    isChapterNavigation && style.chapterNavigation
                )}
            >
                <Heading
                    level={headingLevel}
                    size="xsmall"
                    spacing
                    id={headingId}
                    className={style.heading}
                >
                    {title}
                </Heading>
                <ul aria-labelledby={headingId} className={style.list}>
                    {links.map((anchorLink) => (
                        <li key={anchorLink.anchorId}>
                            <LenkeBase
                                href={`#${anchorLink.anchorId}`}
                                analyticsEvent={AnalyticsEvents.NAVIGATION}
                                analyticsLinkGroup={'Innhold'}
                                analyticsComponent={analyticsComponent}
                                analyticsLabel={anchorLink.linkText}
                                className={style.link}
                            >
                                <ArrowDownRightIcon aria-hidden className={style.icon} />
                                <BodyShort as="span">{anchorLink.linkText}</BodyShort>
                            </LenkeBase>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
