import React from 'react';
import { AlertBox } from '../../_common/alert-box/AlertBox';
import { classNames } from 'utils/classnames';

import style from './PageWarning.module.scss';

type Props = {
    whiteBg?: boolean;
    children: React.ReactNode;
};

export const PageWarning = ({ whiteBg, children }: Props) => {
    return (
        <div className={classNames(style.container, whiteBg && style.whiteBg)}>
            <AlertBox
                variant={'warning'}
                size={'small'}
                className={style.warning}
            >
                {children}
            </AlertBox>
        </div>
    );
};
