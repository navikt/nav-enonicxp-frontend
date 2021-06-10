import React, { useEffect, useRef, useState } from 'react';
import {
    AnchorLink,
    PageNavViewStyle,
} from '../../../types/component-props/parts/page-navigation-menu';
import debounce from 'lodash.debounce';
import { PageNavigationSidebar } from './views/PageNavigationSidebar';
import { PageNavigationInContent } from './views/PageNavigationInContent';

const anchorNavigationOffsetPx = 24;
const menuCurrentIndexMinUpdateRateMs = 1000 / 30;

export type PageNavCallbackArgs = {
    index: number;
    linkText?: string;
    linkId?: string;
};

export type PageNavScrollDirection = 'up' | 'down';

export const getPageNavigationLinkId = (anchorId: string) => `${anchorId}-a`;

const getCurrentIndex = (sortedTargetElements: HTMLElement[]) => {
    const scrollTarget = window.scrollY + anchorNavigationOffsetPx;

    const scrolledToTop =
        !sortedTargetElements?.length ||
        sortedTargetElements[0].offsetTop > scrollTarget;
    if (scrolledToTop) {
        return -1;
    }

    const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight;
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

type Props = {
    anchorLinks: AnchorLink[];
    title?: string;
    currentLinkCallback?: (args: PageNavCallbackArgs) => void;
    viewStyle: PageNavViewStyle;
};

export const PageNavigationMenu = ({
    anchorLinks,
    title,
    currentLinkCallback,
    viewStyle,
}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedLinks, setSortedLinks] = useState<AnchorLink[]>([]);

    const scrollDir = useRef<PageNavScrollDirection>('up');
    const prevScrollPos = useRef(0);

    useEffect(() => {
        if (!currentLinkCallback) {
            return;
        }

        const targetLink = sortedLinks[currentIndex];

        currentLinkCallback({
            index: currentIndex,
            ...(targetLink && {
                linkText: targetLink.linkText,
                linkId: getPageNavigationLinkId(targetLink.anchorId),
            }),
        });
    }, [currentIndex, sortedLinks, currentLinkCallback]);

    useEffect(() => {
        if (!anchorLinks) {
            return;
        }

        const targetElementsSortedByVerticalPosition = anchorLinks
            .reduce((targetsAcc, link) => {
                const targetElement = document.getElementById(link.anchorId);
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

                const scrollPos = window.pageYOffset;

                scrollDir.current =
                    scrollPos > prevScrollPos.current ? 'down' : 'up';
                prevScrollPos.current = scrollPos;

                setCurrentIndex(index);
            },
            menuCurrentIndexMinUpdateRateMs / 2,
            { maxWait: menuCurrentIndexMinUpdateRateMs }
        );

        currentScrollPositionHandler();

        window.addEventListener('scroll', currentScrollPositionHandler);
        return () =>
            window.removeEventListener('scroll', currentScrollPositionHandler);
    }, [anchorLinks]);

    if (!sortedLinks?.length) {
        return null;
    }

    const props = {
        currentIndex: currentIndex,
        title: title,
        links: sortedLinks,
        scrollDirection: scrollDir.current,
    };

    return viewStyle === 'sidebar' ? (
        <PageNavigationSidebar {...props} />
    ) : (
        <PageNavigationInContent {...props} />
    );
};
