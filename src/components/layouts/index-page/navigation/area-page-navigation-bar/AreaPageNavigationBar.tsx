import React, { useRef, useState } from 'react';
import { classNames } from '../../../../../utils/classnames';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { getPublicPathname } from '../../../../../utils/urls';
import { IndexPageLink } from '../routing/IndexPageLink';
import { Chip } from 'components/_common/chip/Chip';
import {
    isElementVisible,
    isHorizontalScrollAtStart,
    isHorizontalScrollAtEnd,
} from 'utils/scroll-to';
import { NavigationButton } from './NavigationButton';
import { IndexPageNavigationCallback } from '../routing/useIndexPageRouting';

import style from './AreaPageNavigationBar.module.scss';

type Props = {
    isVisible: boolean;
    areasRefs: AreaPageProps[];
    pageId: string;
    navigate: IndexPageNavigationCallback;
};

enum Scrollability {
    LEFT_ONLY = 'left_only',
    RIGHT_ONLY = 'right_only',
    BOTH = 'both',
}

export const AreaPageNavigationBar = ({
    isVisible,
    areasRefs,
    pageId,
    navigate,
}: Props) => {
    const navigationBar = useRef(null);
    const navigationWrapper = useRef(null);
    const [scrollability, setScrollability] = useState<Scrollability>(
        Scrollability.RIGHT_ONLY
    );

    const focusEventHandler = (e: React.FocusEvent) => {
        const { target } = e;
        const navBar: Element = navigationBar.current;

        const isVisble = isElementVisible(target, navBar);

        if (!isVisble) {
            const itemBounds = target.getBoundingClientRect();
            const scrollTargetPos = itemBounds.x + itemBounds.width;
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
        const wrapper = navigationWrapper?.current;

        if (isHorizontalScrollAtStart(wrapper)) {
            setScrollability(Scrollability.RIGHT_ONLY);
            return;
        }

        if (isHorizontalScrollAtEnd(wrapper, navBar)) {
            setScrollability(Scrollability.LEFT_ONLY);
            return;
        }

        if (scrollability !== Scrollability.BOTH) {
            setScrollability(Scrollability.BOTH);
        }
    };

    const onNavigationStep = (direction: number) => {
        //const wrapper: Element = navigationWrapper.current;
        const navBar: Element = navigationBar.current;
        const currentScrollPosition = navBar.scrollLeft;

        const scrollOptions: ScrollToOptions = {
            left: currentScrollPosition - direction * 10,
            top: 0,
        };

        navBar.scrollTo(scrollOptions);
    };

    const onNavigationBarScroll = () => {
        checkScrollability();
    };

    return (
        <nav
            className={classNames(
                style.areaPageNavigation,
                !isVisible && style.hidden
            )}
        >
            <NavigationButton
                direction={1}
                navigateCallback={onNavigationStep}
                hidden={scrollability === Scrollability.RIGHT_ONLY}
            />
            <div
                ref={navigationBar}
                className={style.navigationBar}
                onScroll={onNavigationBarScroll}
            >
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
                                navigate={navigate}
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
