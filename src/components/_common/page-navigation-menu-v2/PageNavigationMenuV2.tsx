import React from 'react';
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

    console.log('links:', links);

    return (
        <div className={style.wrapper}>
            <Heading level="2" size="small">
                Innhold på siden
            </Heading>
            <ul className={style.list}>
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                focusable="false"
                                aria-hidden="true"
                                className={style.icon}
                            >
                                <g
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    transform="translate(-2 7)"
                                >
                                    <path d="M4.5 5v6c0 1.1.9 2 2 2H19"></path>
                                    <path d="M14.5 8.5 19 13l-4.5 4.5"></path>
                                </g>
                            </svg>
                            {anchorLink.linkText}
                        </LenkeBase>
                    </li>
                ))}
            </ul>
        </div>
    );
};
