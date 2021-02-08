import React, { useEffect, useState } from 'react';
import {
    AnchorLink,
    PageNavigationMenuProps,
} from '../../../../types/component-props/parts/page-navigation-menu';
import { BEM } from '../../../../utils/bem';
import { LenkeStandalone } from '../../../_common/lenke/LenkeStandalone';
import debounce from 'lodash.debounce';
import './PageNavigationMenu.less';

const bem = BEM('page-nav-menu');

export const PageNavigationMenu = ({ config }: PageNavigationMenuProps) => {
    const anchorLinks = config?.anchorLinks;

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

                targetElementsSorted.some((target, index) => {
                    if (
                        window.innerHeight + scrollPos >=
                        document.body.offsetHeight
                    ) {
                        setCurrentIndex(targetElementsSorted.length - 1);
                        return true;
                    }

                    if (target.offsetTop > scrollPos + 10) {
                        setCurrentIndex(Math.max(index - 1, 0));
                        return true;
                    }

                    return false;
                });
            },
            50,
            { maxWait: 50 }
        );

        window.addEventListener('scroll', currentScrollPositionHandler);
        return () =>
            window.removeEventListener('scroll', currentScrollPositionHandler);
    }, [anchorLinks]);

    if (!sortedLinks?.length) {
        return null;
    }

    return (
        <div className={bem()}>
            {sortedLinks.map((link, index) => (
                <LenkeStandalone
                    href={`#${link.anchorId}`}
                    className={bem('link')}
                    withChevron={index === currentIndex}
                    key={index}
                >
                    {link.linkText}
                </LenkeStandalone>
            ))}
        </div>
    );
};
