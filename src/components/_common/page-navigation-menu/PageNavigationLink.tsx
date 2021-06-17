import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { PageNavViewStyle } from '../../../types/component-props/parts/page-navigation-menu';
import {
    pageNavigationAnchorOffsetPx,
    PageNavScrollDirection,
} from './PageNavigationMenu';
import { smoothScrollToTarget } from '../../../utils/scroll-to';
import './PageNavigationLink.less';

const bem = BEM('page-nav-link');

type Props = {
    targetId: string;
    viewStyle: PageNavViewStyle;
    linkId?: string;
    isCurrent?: boolean;
    scrollDirection?: PageNavScrollDirection;
    children: React.ReactNode;
};

export const PageNavigationLink = React.memo(
    ({
        targetId,
        linkId,
        isCurrent,
        scrollDirection,
        viewStyle,
        children,
    }: Props) => {
        return (
            <LenkeBase
                href={`#${targetId}`}
                onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToTarget(
                        targetId,
                        pageNavigationAnchorOffsetPx
                    );
                }}
                className={classNames(
                    bem(),
                    bem(undefined, viewStyle),
                    scrollDirection && bem(undefined, scrollDirection),
                    isCurrent && bem('current')
                )}
                id={linkId}
            >
                {viewStyle === 'sidebar' && (
                    <span className={bem('decor')} aria-hidden={true} />
                )}
                <span className={bem('text')}>{children}</span>
            </LenkeBase>
        );
    }
);
