import React from 'react';
import { LenkeBase } from '../lenke/LenkeBase';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { Heading } from '@navikt/ds-react';

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);

type Props = {
    anchorLinks?: AnchorLink[];
};

export const PageNavigationMenuV2 = ({ anchorLinks = [] }: Props) => {
    const links = getValidLinks(anchorLinks);

    console.log('links:', links);

    return (
        <>
            <Heading level="2" size="small">
                Innhold på siden
            </Heading>
            <ul>
                {links.map((anchorLink) => (
                    <li key={anchorLink.anchorId}>
                        <LenkeBase
                            href={`#${anchorLink.anchorId}`}
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
        </>
    );
};
