import React from 'react';
import { Heading } from '@navikt/ds-react';
import { BEM, classNames } from '../../../../utils/classnames';
import { PageNavigationLink } from '../PageNavigationLink';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import {
    getPageNavigationLinkId,
    PageNavScrollDirection,
} from '../PageNavigationMenu';

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
                <Heading level="2" size="medium" className={bem('title')}>
                    {title}
                </Heading>
            )}
            <nav aria-label={'Innhold'}>
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
