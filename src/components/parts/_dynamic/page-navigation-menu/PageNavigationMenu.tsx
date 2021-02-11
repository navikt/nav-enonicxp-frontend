import React, { useEffect, useState } from 'react';
import {
    AnchorLink,
    PageNavigationMenuProps,
} from '../../../../types/component-props/parts/page-navigation-menu';
import { BEM } from '../../../../utils/bem';
import debounce from 'lodash.debounce';
import { PageNavigationLink } from './PageNavigationLink';
import './PageNavigationMenu.less';

const bem = BEM('page-nav-menu');

const anchorNavigationOffsetPx = 24;
const menuCurrentIndexMinUpdateRateMs = 1000 / 30;

export type PageNavigationCallbackArg = { linkText: string; index: number };

type Props = Partial<PageNavigationMenuProps> & {
    currentLinkCallback?: (args: PageNavigationCallbackArg) => void;
};

const getCurrentIndex = (targetElements: HTMLElement[]) => {
    const scrollTarget = window.scrollY + anchorNavigationOffsetPx;
    const scrolledToBottom =
        window.scrollY + window.innerHeight >= document.body.offsetHeight;

    const foundIndex = targetElements.findIndex((target) => {
        return target.offsetTop > scrollTarget;
    });

    if (foundIndex === -1 || scrolledToBottom) {
        return targetElements.length - 1;
    }

    return Math.max(foundIndex - 1, 0);
};

export const PageNavigationMenuPart = (props: PageNavigationMenuProps) => {
    return <PageNavigationMenu {...props} />;
};

export const PageNavigationMenu = React.memo(
    ({ config, currentLinkCallback = () => null }: Props) => {
        const anchorLinks = config?.anchorLinks;

        const [currentIndex, setCurrentIndex] = useState(0);
        const [sortedLinks, setSortedLinks] = useState<AnchorLink[]>([]);

        useEffect(() => {
            if (!anchorLinks) {
                return;
            }

            const targetElementsSortedByVerticalOffset = anchorLinks
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
                const aIndex = targetElementsSortedByVerticalOffset.findIndex(
                    (element) => element.id === a.anchorId
                );
                const bIndex = targetElementsSortedByVerticalOffset.findIndex(
                    (element) => element.id === b.anchorId
                );
                return aIndex - bIndex;
            });

            setSortedLinks(_sortedLinks);

            const currentScrollPositionHandler = debounce(
                () => {
                    const index = getCurrentIndex(
                        targetElementsSortedByVerticalOffset
                    );
                    setCurrentIndex(index);
                    const linkText = _sortedLinks[index]?.linkText;
                    currentLinkCallback({
                        linkText,
                        index,
                    });
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
                {sortedLinks.map((link, index) => (
                    <PageNavigationLink
                        anchorId={link.anchorId}
                        current={currentIndex === index}
                        key={index}
                    >
                        {link.linkText}
                    </PageNavigationLink>
                ))}
            </nav>
        );
    }
);
