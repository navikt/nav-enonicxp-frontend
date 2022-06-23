import React, { useRef, useState } from 'react';
import { classNames } from '../../../../../utils/classnames';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { getPublicPathname } from '../../../../../utils/urls';
import { IndexPageLink } from '../link/IndexPageLink';

import style from './AreaPageNavigationBar.module.scss';
import { Chip } from 'components/_common/chip/Chip';
import {
    isElementVisible,
    isHorizontalScrollAtStart,
    isHorizontalScrollAtEnd,
} from 'utils/scroll-to';
import { NavigationButton } from './NavigationButton';

type Props = {
    isVisible: boolean;
    areasRefs: AreaPageProps[];
    pageId: string;
};

enum Scrollability {
    LEFT_ONLY,
    RIGHT_ONLY,
    BOTH,
}

export const AreaPageNavigationBar = ({
    isVisible,
    areasRefs,
    pageId,
}: Props) => {
    const navigationBar = useRef(null);
    const navigationWrapper = useRef(null);
    const [scrollability, setScrollability] = useState<Scrollability>(
        Scrollability.RIGHT_ONLY
    );

    const focusEventHandler = (e: React.FocusEvent) => {
        const { target } = e;
        const navBar: Element = navigationBar.current;
        const item = target;

        const isVisble = isElementVisible(item, navBar);

        if (!isVisble) {
            const itemBounds = item.getBoundingClientRect();
            const scrollTargetPos = itemBounds.x;
            const scrollOptions: ScrollToOptions = {
                left: scrollTargetPos,
                top: 0,
                behavior: 'smooth',
            };
            navBar.scrollTo(scrollOptions);
        }
    };

    const checkScrollability = () => {
        const navBar: Element = navigationBar.current;
        const item = navigationWrapper?.current;

        if (isHorizontalScrollAtStart(item)) {
            setScrollability(Scrollability.RIGHT_ONLY);
        }

        if (isHorizontalScrollAtEnd(item, navBar)) {
            setScrollability(Scrollability.RIGHT_ONLY);
        }
    };

    const onNavigationStep = (direction: number) => {
        //const wrapper: Element = navigationWrapper.current;
        const navBar: Element = navigationBar.current;
        const currentScrollPosition = navBar.scrollLeft;

        const scrollOptions: ScrollToOptions = {
            left: currentScrollPosition - direction * 10,
            top: 0,
            behavior: 'smooth',
        };

        navBar.scrollTo(scrollOptions);
        checkScrollability();
    };

    return (
        <nav
            className={classNames(
                style.areasPageNavigation,
                !isVisible && style.hidden
            )}
        >
            <NavigationButton
                direction={1}
                navigateCallback={onNavigationStep}
                hidden={scrollability === Scrollability.RIGHT_ONLY}
            />
            <div ref={navigationBar} className={style.navigationBar}>
                <div
                    className={style.navigationWrapper}
                    ref={navigationWrapper}
                >
                    {areasRefs.map((areaContent) => {
                        const path = getPublicPathname(areaContent);

                        return (
                            <IndexPageLink
                                href={path}
                                className={style.areasPageNavigationLink}
                                key={areaContent._id}
                                onFocus={focusEventHandler}
                            >
                                <Chip selected={areaContent._id === pageId}>
                                    {areaContent.data.header}
                                </Chip>
                            </IndexPageLink>
                        );
                    })}
                </div>
            </div>
            <NavigationButton
                direction={-1}
                navigateCallback={onNavigationStep}
                hidden={scrollability == Scrollability.LEFT_ONLY}
            />
        </nav>
    );
};
