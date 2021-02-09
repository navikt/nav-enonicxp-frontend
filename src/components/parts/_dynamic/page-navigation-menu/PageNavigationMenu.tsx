import React, { useEffect, useState } from 'react';
import {
    AnchorLink,
    PageNavigationMenuProps,
} from '../../../../types/component-props/parts/page-navigation-menu';
import { BEM } from '../../../../utils/bem';
import debounce from 'lodash.debounce';
import { Undertittel } from 'nav-frontend-typografi';
import { PageNavigationLink } from './PageNavigationLink';
import './PageNavigationMenu.less';

const bem = BEM('page-nav-menu');

const anchorNavigationOffsetPx = 24;
const menuCurrentIndexMinUpdateRateMs = 1000 / 60;

export const PageNavigationMenu = ({ config }: PageNavigationMenuProps) => {
    const anchorLinks = config?.anchorLinks;
    const header = config?.header;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedLinks, setSortedLinks] = useState<AnchorLink[]>([]);

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
            }, [] as HTMLElement[])
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
                const scrollPos = window.scrollY;

                targetElementsSorted.some((target, index, array) => {
                    if (
                        target.offsetTop >
                        scrollPos + anchorNavigationOffsetPx
                    ) {
                        setCurrentIndex(Math.max(index - 1, 0));
                        return true;
                    }

                    if (index === array.length - 1) {
                        setCurrentIndex(index);
                        return true;
                    }

                    return false;
                });
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
            {header && (
                <Undertittel className={bem('header')}>{header}</Undertittel>
            )}
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
