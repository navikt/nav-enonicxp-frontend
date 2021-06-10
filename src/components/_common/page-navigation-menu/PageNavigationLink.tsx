import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import './PageNavigationLink.less';
import { PageNavViewStyle } from '../../../types/component-props/parts/page-navigation-menu';
import { PageNavScrollDirection } from './PageNavigationMenu';

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
        const smoothScrollToAnchor = (e: React.MouseEvent) => {
            e.preventDefault();
            document
                .getElementById(targetId)
                ?.scrollIntoView?.({ behavior: 'smooth' });
        };

        return (
            <LenkeBase
                href={`#${targetId}`}
                className={classNames(
                    bem(),
                    bem(undefined, viewStyle),
                    scrollDirection && bem(undefined, scrollDirection),
                    isCurrent && bem('current')
                )}
                onClick={smoothScrollToAnchor}
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
