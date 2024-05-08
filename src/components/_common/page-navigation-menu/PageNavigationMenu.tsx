import React from 'react';
import { Heading } from '@navikt/ds-react';
import ArrowRightAngle from './ArrowRightAngle';
import { LenkeBase } from '../lenke/LenkeBase';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { PageNavigationDupeLinkWarning } from './PageNavigationDupeLinkWarning';

import style from './PageNavigationMenu.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
    menuHeader: string;
};

export const PageNavigationMenu = ({ anchorLinks = [], menuHeader }: Props) => {
    const links = getValidLinks(anchorLinks);

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />

            <div className={style.wrapper}>
                <Heading level="2" size="small" spacing>
                    {menuHeader} {/* TODO: skal være "Innhold på siden", ikke "Innhold" */}
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
