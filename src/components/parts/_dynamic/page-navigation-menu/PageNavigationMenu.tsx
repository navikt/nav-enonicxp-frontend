import React, { useEffect, useState } from 'react';
import {
    AnchorLink,
    PageNavigationMenuProps,
} from '../../../../types/component-props/parts/page-navigation-menu';
import { BEM } from '../../../../utils/classnames';
import debounce from 'lodash.debounce';
import { PageNavigationLink } from './PageNavigationLink';
import './PageNavigationMenu.less';

const bem = BEM('page-nav-menu');

const anchorNavigationOffsetPx = 24;
const menuCurrentIndexMinUpdateRateMs = 1000 / 30;

export type PageNavCallbackArgs = {
    index: number;
    linkText: string;
    linkId?: string;
};

const getCurrentIndex = (sortedTargetElements: HTMLElement[]) => {
    const scrollTarget = window.scrollY + anchorNavigationOffsetPx;

    if (
        !sortedTargetElements?.length ||
        sortedTargetElements[0].offsetTop > scrollTarget
    ) {
        return -1;
    }

    const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.getElementById('decorator-footer').offsetTop;

    if (scrolledToBottom) {
        return sortedTargetElements.length - 1;
    }

    const foundIndex = sortedTargetElements.findIndex((target) => {
        return target.offsetTop > scrollTarget;
    });

    if (foundIndex === -1) {
        return sortedTargetElements.length - 1;
    }

    return Math.max(foundIndex - 1, 0);
};

export const PageNavigationMenuPart = (props: PageNavigationMenuProps) => {
    return <PageNavigationMenu {...props} />;
};

const getLinkId = (anchorId: string) => `${anchorId}-a`;

type Props = Partial<PageNavigationMenuProps> & {
    currentLinkCallback?: (args: PageNavCallbackArgs) => void;
};

export const PageNavigationMenu = React.memo(
    ({ config, currentLinkCallback }: Props) => {
        const anchorLinks = config?.anchorLinks;

        const [currentIndex, setCurrentIndex] = useState(0);
        const [sortedLinks, setSortedLinks] = useState<AnchorLink[]>([]);

        useEffect(() => {
            if (!currentLinkCallback) {
                return;
            }

            const targetLink = sortedLinks[currentIndex];
            if (!targetLink) {
                return;
            }

            currentLinkCallback({
                index: currentIndex,
                linkText: targetLink.linkText,
                linkId: getLinkId(targetLink.anchorId),
            });
        }, [currentIndex, sortedLinks, currentLinkCallback]);

        useEffect(() => {
            if (!anchorLinks) {
                return;
            }

            const targetElementsSortedByVerticalPosition = anchorLinks
                .reduce((targetsAcc, link) => {
                    const targetElement = document.getElementById(
                        link.anchorId
                    );
                    return targetElement
                        ? [...targetsAcc, targetElement]
                        : targetsAcc;
                }, [])
                .sort((a, b) => a.offsetTop - b.offsetTop);

            const _sortedLinks = anchorLinks.sort((a, b) => {
                const aIndex = targetElementsSortedByVerticalPosition.findIndex(
                    (element) => element.id === a.anchorId
                );
                const bIndex = targetElementsSortedByVerticalPosition.findIndex(
                    (element) => element.id === b.anchorId
                );
                return aIndex - bIndex;
            });

            setSortedLinks(_sortedLinks);

            const currentScrollPositionHandler = debounce(
                () => {
                    const index = getCurrentIndex(
                        targetElementsSortedByVerticalPosition
                    );
                    setCurrentIndex(index);
                },
                menuCurrentIndexMinUpdateRateMs / 2,
                { maxWait: menuCurrentIndexMinUpdateRateMs }
            );

            currentScrollPositionHandler();

            window.addEventListener('scroll', currentScrollPositionHandler);
            return () =>
                window.removeEventListener(
                    'scroll',
                    currentScrollPositionHandler
                );
        }, [anchorLinks]);

        if (!sortedLinks?.length) {
            return null;
        }

        return (
            <nav className={bem()}>
                {sortedLinks.map((anchorLink, index) => (
                    <PageNavigationLink
                        targetId={anchorLink.anchorId}
                        linkId={getLinkId(anchorLink.anchorId)}
                        current={currentIndex === index}
                        key={anchorLink.anchorId}
                    >
                        {anchorLink.linkText}
                    </PageNavigationLink>
                ))}
            </nav>
        );
    }
);
