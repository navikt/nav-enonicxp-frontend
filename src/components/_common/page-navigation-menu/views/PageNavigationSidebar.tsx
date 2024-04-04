import React from 'react';
import { Heading } from '@navikt/ds-react';
import { PageNavigationLink } from 'components/_common/page-navigation-menu/PageNavigationLink';
import {
    getPageNavigationLinkId,
    PageNavScrollDirection,
} from 'components/_common/page-navigation-menu/PageNavigationMenu';
import style from './PageNavigationSidebar.module.scss';
import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';

type Props = {
    title?: string;
    links: AnchorLink[];
    currentIndex: number;
    scrollDirection: PageNavScrollDirection;
};

export const PageNavigationSidebar = ({ title, links, currentIndex, scrollDirection }: Props) => {
    return (
        <div className={style.pageNavSidebar}>
            {title && (
                <Heading level="2" size="medium" className={style.title}>
                    {title}
                </Heading>
            )}
            <nav aria-label={'Innhold'}>
                <ul className={style.list}>
                    {links.map((anchorLink, index) => (
                        <li key={anchorLink.anchorId}>
                            <PageNavigationLink
                                targetId={anchorLink.anchorId}
                                linkId={getPageNavigationLinkId(anchorLink.anchorId)}
                                isCurrent={currentIndex === index}
                                scrollDirection={scrollDirection}
                                viewStyle={'sidebar'}
                            >
                                {anchorLink.linkText}
                            </PageNavigationLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
