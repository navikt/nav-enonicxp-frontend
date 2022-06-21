import React, { useRef } from 'react';
import { classNames } from '../../../../../utils/classnames';
import { LenkeInline } from '../../../../_common/lenke/LenkeInline';
import { AreaPageProps } from '../../../../../types/content-props/index-pages-props';
import { getPublicPathname } from '../../../../../utils/urls';

import style from './AreaPageNavigationBar.module.scss';
import { Chip } from 'components/_common/chip/Chip';
import { isElementVisible } from 'utils/position';
import { usePageConfig } from 'store/hooks/usePageConfig';

type Props = {
    isVisible: boolean;
    areasRefs: AreaPageProps[];
    navigationCallback: (path: string) => void;
};

export const AreaPageNavigationBar = ({
    isVisible,
    areasRefs,
    navigationCallback,
}: Props) => {
    const navigationBar = useRef(null);
    const { pageConfig } = usePageConfig();
    const { pageId } = pageConfig;

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
                        <LenkeInline
                            href={path}
                            onClick={(e) => {
                                e.preventDefault();
                                navigationCallback(path);
                            }}
                            onFocus={focusEventHandler}
                            className={style.areasPageNavigationLink}
                            key={areaContent._id}
                        >
                            <Chip selected={areaContent._id === pageId}>
                                {areaContent.data.header}
                            </Chip>
                        </LenkeInline>
                    );
                })}
            </div>
        </nav>
    );
};
