import React from 'react';
import { BEM, classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import './PageNavigationLink.less';

const bem = BEM('page-nav-link');

type Props = {
    targetId: string;
    linkId?: string;
    isCurrent?: boolean;
    scrollDirection?: 'up' | 'down';
    children: React.ReactNode;
};

export const PageNavigationLink = React.memo(
    ({ targetId, linkId, isCurrent, scrollDirection, children }: Props) => {
        const smoothScrollToAnchor = (e: React.MouseEvent) => {
            e.preventDefault();
            document
                .getElementById(targetId)
                ?.scrollIntoView?.({ behavior: 'smooth' });
        };

        return (
            <li>
                <LenkeBase
                    href={`#${targetId}`}
                    className={classNames(
                        bem(),
                        scrollDirection && bem(undefined, scrollDirection),
                        isCurrent && bem('current')
                    )}
                    onClick={smoothScrollToAnchor}
                    id={linkId}
                >
                    <span className={bem('decor')} aria-hidden={true} />
                    <span className={bem('text')}>{children}</span>
                </LenkeBase>
            </li>
        );
    }
);
