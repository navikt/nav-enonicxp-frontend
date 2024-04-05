import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import { AnchorLink, PageNavViewStyle } from 'types/component-props/parts/page-navigation-menu';
import Config from 'config';

import { PageNavigationSidebar } from './views/PageNavigationSidebar';
import { PageNavigationInContent } from './views/PageNavigationInContent';
import { PageNavigationDupeLinkWarning } from './PageNavigationDupeLinkWarning';

const MENU_UPDATE_RATE = 1000 / 30;

type PageNavCallbackArgs = {
    index: number;
    linkText?: string;
    linkId?: string;
};

export type PageNavScrollDirection = 'up' | 'down';

type Props = {
    anchorLinks?: AnchorLink[];
    title?: string;
    currentLinkCallback?: (args: PageNavCallbackArgs) => void;
    viewStyle: PageNavViewStyle;
};

export const PageNavigationMenu = ({
    anchorLinks = [],
    title,
    currentLinkCallback,
    viewStyle,
}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const links = getValidLinks(anchorLinks);

    const scrollDir = useRef<PageNavScrollDirection>('up');
    const prevScrollPos = useRef(0);

    useEffect(() => {
        if (!currentLinkCallback) {
            return;
        }

        const targetLink = links[currentIndex];

        currentLinkCallback({
            index: currentIndex,
            ...(targetLink && {
                linkText: targetLink.linkText,
                linkId: getPageNavigationLinkId(targetLink.anchorId),
            }),
        });
    }, [currentIndex, links, currentLinkCallback]);

    useEffect(() => {
        const elementsSortedByVerticalPosition = links.reduce<HTMLElement[]>((acc, link) => {
            const element = document.getElementById(link.anchorId);
            if (element) {
                acc.push(element);
            }
            return acc;
        }, []);

        const currentScrollPositionHandler = debounce(
            () => {
                const index = getCurrentLinkIndex(elementsSortedByVerticalPosition);

                const scrollPos = window.scrollY;

                scrollDir.current = scrollPos > prevScrollPos.current ? 'down' : 'up';
                prevScrollPos.current = scrollPos;

                setCurrentIndex(index);
            },
            MENU_UPDATE_RATE / 2,
            { maxWait: MENU_UPDATE_RATE }
        );

        currentScrollPositionHandler();

        window.addEventListener('scroll', currentScrollPositionHandler);
        return () => window.removeEventListener('scroll', currentScrollPositionHandler);
    }, [links]);

    if (links.length === 0) {
        return null;
    }

    const PageNavigationComponent =
        viewStyle === 'sidebar' ? PageNavigationSidebar : PageNavigationInContent;

    const props = {
        currentIndex,
        title,
        links,
        scrollDirection: scrollDir.current,
    };

    return (
        <>
            <PageNavigationDupeLinkWarning anchorLinks={anchorLinks} />
            <PageNavigationComponent {...props} />
        </>
    );
};

export const getPageNavigationLinkId = (anchorId: string) => `${anchorId}-a`;

const getCurrentLinkIndex = (targetElements: HTMLElement[]) => {
    const scrollTarget = window.scrollY + Config.vars.dekoratorenHeight;

    const scrolledToTop = !!(targetElements?.length && targetElements[0].offsetTop > scrollTarget);

    if (scrolledToTop) {
        return -1;
    }

    const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;

    if (scrolledToBottom) {
        return targetElements.length - 1;
    }

    const foundIndex = targetElements.findIndex((target) => {
        return target.offsetTop > scrollTarget;
    });

    if (foundIndex === -1) {
        return targetElements.length - 1;
    }

    return Math.max(foundIndex - 1, 0);
};

const getValidLinks = (anchorLinks: AnchorLink[]): AnchorLink[] =>
    anchorLinks.filter((link) => link.anchorId && link.linkText && !link.isDupe);
