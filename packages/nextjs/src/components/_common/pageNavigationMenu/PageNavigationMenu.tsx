import React, { useId } from 'react';
import { Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { classNames } from 'utils/classnames';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { AktuelleMalgrupper } from 'components/_common/aktuelleMalgrupper/AktuelleMalgrupper';
import { NavigationLink } from './NavigationLink/NavigationLink';

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
            aria-labelledby={title ? headingId : undefined}
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
                        <NavigationLink
                            anchorId={anchorLink.anchorId}
                            linkText={anchorLink.linkText}
                            analyticsComponent={analyticsComponent}
                        />
                    </li>
                ))}
            </ul>
            {!isChapterNavigation && <AktuelleMalgrupper />}
        </nav>
    );
};
