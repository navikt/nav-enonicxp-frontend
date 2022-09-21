import React from 'react';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { classNames } from 'utils/classnames';

import style from './PageWarning.module.scss';

type Props = {
    whiteBg?: boolean;
    size?: React.ComponentProps<typeof AlertBox>['size'];
    children: React.ReactNode;
};

export const PageWarning = ({ whiteBg, size = 'small', children }: Props) => {
    return (
        <div className={classNames(style.container, whiteBg && style.whiteBg)}>
            <AlertBox variant={'warning'} size={size} className={style.warning}>
                {children}
            </AlertBox>
        </div>
    );
};
