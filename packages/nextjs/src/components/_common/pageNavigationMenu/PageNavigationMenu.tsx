import React, { useId } from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { classNames } from 'utils/classnames';
import { AnalyticsEvents } from 'utils/analytics';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { AktuelleMalgrupper } from 'components/_common/aktuelleMalgrupper/AktuelleMalgrupper';
import { AngleIcon } from './AngleIcon/AngleIcon';

import style from './PageNavigationMenu.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    analyticsComponent?: string;
    ariaLabel?: string;
    title?: string;
    isChapterNavigation?: boolean;
    className?: string;
};

export const PageNavigationMenu = ({
    anchorLinks = [],
    analyticsComponent = 'Meny for intern-navigasjon',
    ariaLabel,
    title,
    isChapterNavigation = false,
    className,
}: Props) => {
    const headingId = `heading-page-navigation-menu-${useId()}`;
    const links = getValidLinks(anchorLinks);

    if (links.length === 0) {
        return (
            <EditorHelp text="Kunne ikke lage lenker til intern navigasjon. Enten finnes det ingen Innholdsseksjoner på denne siden, eller alle er satt til 'ikke vis under innhold'. Hvis siden nettopp er opprettet, forsøk å klikke 'marker som klar' eller last hele siden på nytt." />
        );
    }

    return (
        <nav
            aria-labelledby={headingId}
            aria-label={ariaLabel}
            className={classNames(
                style.pageNavigationMenu,
                isChapterNavigation && style.chapterNavigation,
                className
            )}
        >
            {title && (
                <Heading level="2" size="xsmall" id={headingId} className={style.heading}>
                    {title}
                </Heading>
            )}
            <ul className={style.list}>
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
                            <AngleIcon />
                            <BodyLong as="span" className={style.linkText}>
                                {anchorLink.linkText}
                            </BodyLong>
                        </LenkeBase>
                    </li>
                ))}
            </ul>
            {!isChapterNavigation && <AktuelleMalgrupper />}
        </nav>
    );
};
