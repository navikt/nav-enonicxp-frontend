import React, { useId } from 'react';
import { ArrowDownRightIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { PageNavigationDupeLinkWarning } from './PageNavigationDupeLinkWarning';
import { AnalyticsEvents } from 'utils/amplitude';

import style from './PageNavigationMenu.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    analyticsComponent?: string;
    title: string;
};

export const PageNavigationMenu = ({
    anchorLinks = [],
    analyticsComponent = 'Meny for intern-navigasjon',
    title,
}: Props) => {
    const links = getValidLinks(anchorLinks);

    const headingId = `heading-page-navigation-menu-${useId()}`;

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div className={style.wrapper}>
                <Heading level="2" size="small" spacing id={headingId}>
                    {title}
                    {/* TODO: skal være "Innhold på siden", ikke "Innhold". Settes redaksjonelt, men kunne kanskje hardkodes? */}
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
                                <ArrowDownRightIcon />
                                {anchorLink.linkText}
                            </LenkeBase>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
