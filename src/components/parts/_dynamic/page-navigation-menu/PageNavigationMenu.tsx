import React, { useEffect, useState } from 'react';
import { PageNavigationMenuProps } from '../../../../types/component-props/parts/page-navigation-menu';
import { BEM } from '../../../../utils/bem';
import { LenkeStandalone } from '../../../_common/lenke/LenkeStandalone';
import './PageNavigationMenu.less';

const bem = BEM('page-nav-menu');

export const PageNavigationMenu = ({ config }: PageNavigationMenuProps) => {
    const anchorLinks = config?.anchorLinks;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [sortedLinks, setSortedLinks] = useState(undefined);

    useEffect(() => {
        if (!anchorLinks) {
            return;
        }

        const _sortedLinks = anchorLinks
            .filter((link) => document.getElementById(link.anchor))
            .sort(
                (a, b) =>
                    document.getElementById(a.anchor).offsetTop -
                    document.getElementById(b.anchor).offsetTop
            );

        setSortedLinks(_sortedLinks);

        const scrollHandler = () => {
            const scrollPos = window.scrollY;

            const anchorTargets = anchorLinks.map((link) =>
                document.getElementById(link.anchor)
            );

            anchorTargets.some((target, index) => {
                if (
                    window.innerHeight + scrollPos >=
                    document.body.offsetHeight
                ) {
                    setCurrentIndex(anchorTargets.length - 1);
                    return true;
                }

                if (target.offsetTop > scrollPos + 10) {
                    setCurrentIndex(Math.max(index - 1, 0));
                    return true;
                }

                return false;
            });
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [anchorLinks]);

    if (!sortedLinks?.length) {
        return null;
    }
    return (
        <div className={bem()}>
            {sortedLinks.map((link, index) => (
                <LenkeStandalone
                    href={`#${link.anchor}`}
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
