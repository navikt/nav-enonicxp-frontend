import React, { useRef } from 'react';
import { classNames } from '../../../../../utils/classnames';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { getPublicPathname } from '../../../../../utils/urls';
import { IndexPageLink } from '../link/IndexPageLink';

import style from './AreaPageNavigationBar.module.scss';
import { Chip } from 'components/_common/chip/Chip';
import { isElementVisible } from 'utils/position';

type Props = {
    isVisible: boolean;
    areasRefs: AreaPageProps[];
    pageId: string;
};

export const AreaPageNavigationBar = ({
    isVisible,
    areasRefs,
    pageId,
}: Props) => {
    const navigationBar = useRef(null);

    const focusEventHandler = (e: React.FocusEvent) => {
        const { target } = e;
        const navBar: Element = navigationBar.current;
        const item = target;

        const isVisble = isElementVisible(item, navBar);

        if (!isVisble) {
            const itemBounds = item.getBoundingClientRect();
            const scrollTargetPos = itemBounds.x + itemBounds.width;
            const scrollOptions: ScrollToOptions = {
                left: scrollTargetPos,
                top: 0,
                behavior: 'smooth',
            };
            navBar.scrollTo(scrollOptions);
        }
    };

    return (
        <nav
            className={classNames(
                style.areasPageNavigation,
                !isVisible && style.hidden
            )}
            ref={navigationBar}
        >
            <div className={style.navigationWrapper}>
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
        </nav>
    );
};
