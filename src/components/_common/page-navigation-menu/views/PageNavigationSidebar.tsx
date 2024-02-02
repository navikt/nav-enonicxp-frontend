import React from 'react';
import { Heading } from '@navikt/ds-react';
import { PageNavigationLink } from '../PageNavigationLink';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import {
    getPageNavigationLinkId,
    PageNavScrollDirection,
} from '../PageNavigationMenu';
import { PageNavigationDupeLinkWarning } from '../PageNavigationDupeLinkWarning';
import { CollapsableItem } from '../PageNavigationCollapsable';

import style from './PageNavigationSidebar.module.scss';

type Props = {
    title?: string;
    links: AnchorLink[];
    dupes: AnchorLink[];
    currentIndex: number;
    showSubMenu?: boolean;
    scrollDirection: PageNavScrollDirection;
};

export const PageNavigationSidebar = ({
    title,
    links,
    dupes,
    currentIndex,
    showSubMenu,
    scrollDirection,
}: Props) => {
    return (
        <div className={style.pageNavSidebar}>
            {title && (
                <Heading level="2" size="medium" className={style.title}>
                    {title}
                </Heading>
            )}
            <PageNavigationDupeLinkWarning dupes={dupes} />
            <nav aria-label={'Innhold'}>
                <ul className={style.list}>
                    {links.map((anchorLink, index) => {
                        const showSublinks =
                            showSubMenu && anchorLink.subLinks?.length > 0;
                        return (
                            <li key={anchorLink.anchorId}>
                                {showSublinks && (
                                    <CollapsableItem
                                        anchorLink={anchorLink}
                                        scrollDirection={scrollDirection}
                                        isCurrent={currentIndex === index}
                                        currentIndex={currentIndex}
                                        viewStyle={'sidebar'}
                                    />
                                )}
                                {!showSublinks && (
                                    <PageNavigationLink
                                        targetId={anchorLink.anchorId}
                                        linkId={getPageNavigationLinkId(
                                            anchorLink.anchorId
                                        )}
                                        isCurrent={currentIndex === index}
                                        scrollDirection={scrollDirection}
                                        viewStyle={'sidebar'}
                                    >
                                        {anchorLink.linkText}
                                    </PageNavigationLink>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
