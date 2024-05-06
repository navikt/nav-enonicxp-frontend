import React from 'react';
import ArrowRightAngle from './ArrowRightAngle';
import { LenkeBase } from '../lenke/LenkeBase';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { Heading } from '@navikt/ds-react';

import style from './PageNavigationMenuV2.module.scss';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
};

export const PageNavigationMenuV2 = ({ anchorLinks = [] }: Props) => {
    const links = getValidLinks(anchorLinks);

    return (
        <div className={style.wrapper}>
            <Heading level="2" size="small" spacing>
                Innhold på siden
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
    );
};
