import React from 'react';
import { Heading } from '@navikt/ds-react';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import ArrowRightAngle from './ArrowRightAngle';
import { PageNavigationDupeLinkWarning } from './PageNavigationDupeLinkWarning';

import style from './PageNavigationMenu.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    title: string;
};

export const PageNavigationMenu = ({ anchorLinks = [], title }: Props) => {
    const links = getValidLinks(anchorLinks);

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div className={style.wrapper}>
                <Heading level="2" size="small" spacing>
                    {title} {/* TODO: skal være "Innhold på siden", ikke "Innhold" */}
                </Heading>
                <ul className={style.list}>
                    {links.map((anchorLink) => (
                        <li key={anchorLink.anchorId}>
                            <LenkeBase
                                href={`#${anchorLink.anchorId}`}
                                analyticsLinkGroup={'Innhold'}
                                analyticsComponent={'Meny for intern-navigasjon'}
                                className={style.link}
                            >
                                <ArrowRightAngle />
                                {anchorLink.linkText}
                            </LenkeBase>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
