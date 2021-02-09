import React from 'react';
import { BEM } from '../../../../utils/bem';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import './PageNavigationLink.less';

const bem = BEM('page-nav-link');

type Props = {
    anchorId: string;
    current?: boolean;
    children: React.ReactNode;
};

export const PageNavigationLink = React.memo(
    ({ anchorId, current, children }: Props) => {
        const smoothScrollToAnchor = (e: React.MouseEvent) => {
            e.preventDefault();
            document
                .getElementById(anchorId)
                ?.scrollIntoView?.({ behavior: 'smooth' });
        };

        return (
            <LenkeBase
                href={`#${anchorId}`}
                className={`lenke ${bem()} ${
                    current ? bem(undefined, 'current') : ''
                }`}
                onClick={smoothScrollToAnchor}
            >
                <div className={bem('decor')} aria-hidden={true} />
                <div className={bem('text')}>{children}</div>
            </LenkeBase>
        );
    }
);
