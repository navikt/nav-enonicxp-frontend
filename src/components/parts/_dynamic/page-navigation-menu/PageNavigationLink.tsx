import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import { LenkeBase } from '../../../_common/lenke/LenkeBase';
import './PageNavigationLink.less';

const bem = BEM('page-nav-link');

type Props = {
    targetId: string;
    linkId?: string;
    current?: boolean;
    children: React.ReactNode;
};

export const PageNavigationLink = React.memo(
    ({ targetId, linkId, current, children }: Props) => {
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
                    'lenke',
                    bem(),
                    current && bem(undefined, 'current')
                )}
                onClick={smoothScrollToAnchor}
                id={linkId}
            >
                <div className={bem('decor')} aria-hidden={true} />
                <div className={bem('text')}>{children}</div>
            </LenkeBase>
        );
    }
);
