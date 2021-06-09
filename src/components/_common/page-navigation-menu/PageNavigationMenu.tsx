import React, { useEffect, useRef, useState } from 'react';
import { AnchorLink } from '../../../types/component-props/parts/page-navigation-menu';
import { BEM, classNames } from '../../../utils/classnames';
import debounce from 'lodash.debounce';
import { PageNavigationLink } from './PageNavigationLink';
import { Systemtittel } from 'nav-frontend-typografi';
import './PageNavigationMenu.less';

const bem = BEM('page-nav-menu');

const anchorNavigationOffsetPx = 24;
const menuCurrentIndexMinUpdateRateMs = 1000 / 30;

export type PageNavCallbackArgs = {
    index: number;
    linkText?: string;
    linkId?: string;
};

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

const getLinkId = (anchorId: string) => `${anchorId}-a`;

type Props = {
    anchorLinks: AnchorLink[];
    title?: string;
    currentLinkCallback?: (args: PageNavCallbackArgs) => void;
};

export const PageNavigationMenu = React.memo(
    ({ anchorLinks, title, currentLinkCallback }: Props) => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [sortedLinks, setSortedLinks] = useState<AnchorLink[]>([]);

        const scrollDir = useRef<'up' | 'down'>('up');
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
                    linkId: getLinkId(targetLink.anchorId),
                }),
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
                window.removeEventListener(
                    'scroll',
                    currentScrollPositionHandler
                );
        }, [anchorLinks]);

        if (!sortedLinks?.length) {
            return null;
        }

        console.log(scrollDir.current, currentIndex);

        return (
            <div className={classNames(bem(), bem('wrapper'))}>
                {title && (
                    <Systemtittel className={bem('title')}>
                        {title}
                    </Systemtittel>
                )}
                <nav role={'navigation'}>
                    <ul className={bem('list')}>
                        {sortedLinks.map((anchorLink, index) => (
                            <PageNavigationLink
                                targetId={anchorLink.anchorId}
                                linkId={getLinkId(anchorLink.anchorId)}
                                isCurrent={currentIndex === index}
                                scrollDirection={scrollDir.current}
                                key={anchorLink.anchorId}
                            >
                                {anchorLink.linkText}
                            </PageNavigationLink>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    }
);
