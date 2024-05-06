import React from 'react';
import { LenkeBase } from '../lenke/LenkeBase';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
};

export const PageNavigationMenuV2 = ({ anchorLinks = [] }: Props) => {
    const links = getValidLinks(anchorLinks);

    console.log('links:', links);

    return (
        <ul>
            {links.map((anchorLink) => (
                <li key={anchorLink.anchorId}>
                    <LenkeBase
                        href={`#${anchorLink.anchorId}`}
                        // href="#hvem"
                        // onClick={setLocationHashAndScrollToTarget}
                        analyticsLinkGroup={'Innhold'}
                        analyticsComponent={'Meny for intern-navigasjon'}
                        // className={classNames(
                        //     style.pageNavLink,
                        //     currentViewStyle.pageNavLink,
                        //     scrollDirection && sidebarStyle[scrollDirection],
                        //     isCurrent && sidebarStyle.current
                        // )}
                        // id={linkId}
                    >
                        {anchorLink.linkText}
                    </LenkeBase>
                </li>
            ))}
        </ul>
    );
};
