import React, { useEffect, useRef, useState } from 'react';
import {
    AnchorLink,
    PageNavViewStyle,
} from '../../../types/component-props/parts/page-navigation-menu';
import debounce from 'lodash.debounce';
import { PageNavigationSidebar } from './views/PageNavigationSidebar';
import { PageNavigationInContent } from './views/PageNavigationInContent';
import Config from '../../../config';

export const pageNavigationAnchorOffsetPx = Config.vars.pxPerRem;
const menuCurrentIndexMinUpdateRateMs = 1000 / 30;

export type PageNavCallbackArgs = {
    index: number;
    linkText?: string;
    linkId?: string;
};

export type PageNavScrollDirection = 'up' | 'down';

export const getPageNavigationLinkId = (anchorId: string) => `${anchorId}-a`;

const getCurrentLinkIndex = (links: AnchorLink[]) => {
    const targetElements = links.reduce((elements, link) => {
        const element = document.getElementById(link.anchorId);
        return element ? [...elements, element] : elements;
    }, []);

    const scrollTarget = window.scrollY + Config.vars.dekoratorenHeight;

    const scrolledToTop = !!(
        targetElements?.length && targetElements[0].offsetTop > scrollTarget
    );

    if (scrolledToTop) {
        return -1;
    }

    const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight;

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
    anchorLinks?.filter(
        (link) =>
            link.anchorId &&
            link.linkText &&
            !link.isDupe &&
            // On the client-side we also check if the element is in the DOM
            (typeof document === 'undefined' ||
                !!document.getElementById(link.anchorId))
    ) ||
    [].map((link) => ({ ...link, subLinks: getValidLinks(link.subLinks) }));

type Props = {
    anchorLinks: AnchorLink[];
    title?: string;
    showSubMenu?: boolean;
    currentLinkCallback?: (args: PageNavCallbackArgs) => void;
    viewStyle: PageNavViewStyle;
};

const sortLinks = (links: AnchorLink[]) => {
    return links
        .sort((a, b) => {
            const elementA = document.getElementById(a.anchorId);
            const elementB = document.getElementById(b.anchorId);
            return elementA.offsetTop - elementB.offsetTop;
        })
        .map((link) => {
            return link.subLinks?.length > 0
                ? {
                      ...link,
                      subLinks: sortLinks(link.subLinks),
                  }
                : link;
        });
};

const flattenAnchorLinks = (links: AnchorLink[]): AnchorLink[] => {
    return links.reduce((acc, link) => {
        const subLinks = link.subLinks?.length
            ? flattenAnchorLinks(link.subLinks)
            : [];
        return [...acc, link, ...subLinks];
    }, []);
};

export const PageNavigationMenu = ({
    anchorLinks,
    title,
    currentLinkCallback,
    showSubMenu,
    viewStyle,
}: Props) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [links, setLinks] = useState<AnchorLink[]>(
        getValidLinks(anchorLinks)
    );

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
        if (!anchorLinks) {
            return;
        }

        const sortedLinks = sortLinks(getValidLinks(anchorLinks));

        const currentScrollPositionHandler = debounce(
            () => {
                const index = getCurrentLinkIndex(sortedLinks);

                const scrollPos = window.pageYOffset;

                scrollDir.current =
                    scrollPos > prevScrollPos.current ? 'down' : 'up';
                prevScrollPos.current = scrollPos;

                setCurrentIndex(index);
            },
            menuCurrentIndexMinUpdateRateMs / 2,
            { maxWait: menuCurrentIndexMinUpdateRateMs }
        );

        setLinks(sortedLinks);
        currentScrollPositionHandler();

        window.addEventListener('scroll', currentScrollPositionHandler);
        return () =>
            window.removeEventListener('scroll', currentScrollPositionHandler);
    }, [anchorLinks]);

    if (!links?.length) {
        return null;
    }

    const props = {
        currentIndex: currentIndex,
        title: title,
        links: links,
        scrollDirection: scrollDir.current,
        showSubMenu: showSubMenu,
        dupes: flattenAnchorLinks(anchorLinks).filter((link) => link.isDupe),
    };

    return viewStyle === 'sidebar' ? (
        <PageNavigationSidebar {...props} />
    ) : (
        <PageNavigationInContent {...props} />
    );
};
