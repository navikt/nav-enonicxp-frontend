import React, { useId } from 'react';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { classNames } from 'utils/classnames';
import { AnalyticsEvents } from 'utils/amplitude';
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

    if (links.length === 0) return null;

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div
                className={classNames(
                    style.pageNavigationMenu,
                    isChapterNavigation && style.chapterNavigation
                )}
            >
                <Heading level="2" size="xsmall" spacing id={headingId} className={style.heading}>
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
                                <ArrowDownRightIcon className={style.icon} />
                                <BodyShort as="span">{anchorLink.linkText}</BodyShort>
                            </LenkeBase>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
