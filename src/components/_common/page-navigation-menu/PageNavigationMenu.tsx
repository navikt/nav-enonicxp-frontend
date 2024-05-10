import React from 'react';
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
    ariaLabel: string;
    title: string;
};

export const PageNavigationMenu = ({
    anchorLinks = [],
    ariaLabel = 'default TODO',
    title,
}: Props) => {
    const links = getValidLinks(anchorLinks);

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div className={style.wrapper}>
                <Heading level="2" size="small" spacing>
                    {title}
                    {/* TODO: skal være "Innhold på siden", ikke "Innhold". Settes redaksjonelt, men kunne kanskje hardkodes? */}
                </Heading>
                <ul aria-label={ariaLabel} className={style.list}>
                    {links.map((anchorLink) => (
                        <li key={anchorLink.anchorId}>
                            <LenkeBase
                                href={`#${anchorLink.anchorId}`}
                                analyticsEvent={AnalyticsEvents.NAVIGATION}
                                analyticsLinkGroup={'Innhold'} //TODO var
                                analyticsComponent={'Meny for intern-navigasjon'} //TODO var
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
