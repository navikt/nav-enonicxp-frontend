import React from 'react';
import { Header } from '../../headers/Header';
import { PageNavigationLink } from '../PageNavigationLink';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import { getPageNavigationLinkId } from '../PageNavigationMenu';
import { PageNavigationDupeLinkWarning } from '../PageNavigationDupeLinkWarning';
import style from './PageNavigationInContent.module.scss';

type Props = {
    title?: string;
    links: AnchorLink[];
    dupes: AnchorLink[];
};

export const PageNavigationInContent = ({ title, links, dupes }: Props) => {
    return (
        <div className={style.pageNavInContent}>
            {title && (
                <Header
                    level="2"
                    className={style.title}
                    justify={'left'}
                    size="medium"
                >
                    {title}
                </Header>
            )}
            <PageNavigationDupeLinkWarning dupes={dupes} />
            <nav aria-label={'Innhold'}>
                <ul className={style.list}>
                    {links.map((anchorLink) => (
                        <li key={anchorLink.anchorId}>
                            <PageNavigationLink
                                targetId={anchorLink.anchorId}
                                linkId={getPageNavigationLinkId(
                                    anchorLink.anchorId
                                )}
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
