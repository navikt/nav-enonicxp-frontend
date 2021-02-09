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

type Props = Partial<PageNavigationMenuProps> & {
    currentCallback?: (linkText: string) => void;
};

export const PageNavigationMenuPart = (props: PageNavigationMenuProps) => {
    return <PageNavigationMenu {...props} />;
};

export const PageNavigationMenu = ({
    config,
    currentCallback = () => null,
}: Props) => {
    const anchorLinks = config?.anchorLinks;

    const [currentIndex, _setCurrentIndex] = useState(0);
    const [sortedLinks, setSortedLinks] = useState<AnchorLink[]>([]);

    const setCurrentIndex = (index: number) => {
        _setCurrentIndex(index);
        currentCallback(sortedLinks[index]?.linkText);
    };

    useEffect(() => {
        if (!anchorLinks) {
            return;
        }

        const targetElementsSorted = anchorLinks
            .reduce((targetsAcc, link) => {
                const targetElement = document.getElementById(link.anchorId);
                return targetElement
                    ? [...targetsAcc, targetElement]
                    : targetsAcc;
            }, [])
            .sort((a, b) => a.offsetTop - b.offsetTop);

        const _sortedLinks = anchorLinks.sort((a, b) => {
            const aIndex = targetElementsSorted.findIndex(
                (element) => element.id === a.anchorId
            );
            const bIndex = targetElementsSorted.findIndex(
                (element) => element.id === b.anchorId
            );
            return aIndex - bIndex;
        });

        setSortedLinks(_sortedLinks);

        const currentScrollPositionHandler = debounce(
            () => {
                const scrollTarget = window.scrollY + anchorNavigationOffsetPx;
                const scrolledToBottom =
                    window.scrollY + window.innerHeight >=
                    document.body.offsetHeight;

                const foundIndex = targetElementsSorted.findIndex((target) => {
                    return target.offsetTop > scrollTarget;
                });

                if (foundIndex === -1 || scrolledToBottom) {
                    setCurrentIndex(targetElementsSorted.length - 1);
                    return;
                }

                setCurrentIndex(Math.max(foundIndex - 1, 0));
            },
            menuCurrentIndexMinUpdateRateMs / 2,
            { maxWait: menuCurrentIndexMinUpdateRateMs }
        );

        window.addEventListener('scroll', currentScrollPositionHandler);
        return () =>
            window.removeEventListener('scroll', currentScrollPositionHandler);
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
};
