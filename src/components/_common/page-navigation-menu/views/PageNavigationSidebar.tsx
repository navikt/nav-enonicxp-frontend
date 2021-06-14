import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { Header } from '../../headers/Header';
import { PageNavigationLink } from '../PageNavigationLink';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import {
    getPageNavigationLinkId,
    PageNavScrollDirection,
} from '../PageNavigationMenu';
import './PageNavigationSidebar.less';
import { TypoStyle } from '../../../../types/typo-style';

const bem = BEM('page-nav-sidebar');

type Props = {
    title?: string;
    links: AnchorLink[];
    currentIndex: number;
    scrollDirection: PageNavScrollDirection;
};

export const PageNavigationSidebar = ({
    title,
    links,
    currentIndex,
    scrollDirection,
}: Props) => {
    return (
        <div className={classNames(bem())}>
            {title && (
                <Header
                    tag={'h2'}
                    typoStyle={TypoStyle.Undertittel}
                    className={bem('title')}
                    justify={'left'}
                >
                    {title}
                </Header>
            )}
            <nav role={'navigation'} aria-label={'Innhold'}>
                <ul className={bem('list')}>
                    {links.map((anchorLink, index) => (
                        <li key={anchorLink.anchorId}>
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
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
