import React from 'react';
import { Header } from 'components/_common/headers/Header';
import { PageNavigationLink } from 'components/_common/page-navigation-menu/PageNavigationLink';
import { getPageNavigationLinkId } from 'components/_common/page-navigation-menu/PageNavigationMenu';

import { AnchorLink } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import style from './PageNavigationInContent.module.scss';

type Props = {
    title?: string;
    links: AnchorLink[];
};

export const PageNavigationInContent = ({ title, links }: Props) => {
    return (
        <div className={style.pageNavInContent}>
            {title && (
                <Header level="2" className={style.title} justify={'left'} size="medium">
                    {title}
                </Header>
            )}
            <nav aria-label={'Innhold'}>
                <ul className={style.list}>
                    {links.map((anchorLink) => (
                        <li key={anchorLink.anchorId}>
                            <PageNavigationLink
                                targetId={anchorLink.anchorId}
                                linkId={getPageNavigationLinkId(anchorLink.anchorId)}
                                viewStyle={'inContent'}
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
