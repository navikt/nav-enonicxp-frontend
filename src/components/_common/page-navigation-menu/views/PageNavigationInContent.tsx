import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { Header } from '../../headers/Header';
import { PageNavigationLink } from '../PageNavigationLink';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import { getPageNavigationLinkId } from '../PageNavigationMenu';
import './PageNavigationInContent.less';

const bem = BEM('page-nav-in-content');

type Props = {
    title?: string;
    links: AnchorLink[];
};

export const PageNavigationInContent = ({ title, links }: Props) => {
    return (
        <div className={classNames(bem())}>
            {title && (
                <Header
                    level={2}
                    className={bem('title')}
                    justify={'left'}
                    size="m"
                >
                    {title}
                </Header>
            )}
            <nav role={'navigation'} aria-label={'Innhold'}>
                <ul className={bem('list')}>
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
