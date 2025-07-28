import React, { PropsWithChildren } from 'react';
import { Varselboks } from 'components/_common/varselboks/Varselboks';
import { classNames } from 'utils/classnames';
import style from './PageWarning.module.scss';

type Props = PropsWithChildren<{
    whiteBg?: boolean;
    size?: React.ComponentProps<typeof Varselboks>['size'];
}>;

export const PageWarning = ({ whiteBg, size = 'small', children }: Props) => {
    return (
        <section className={classNames(style.container, whiteBg && style.whiteBg)}>
            <Varselboks variant={'warning'} size={size} className={style.warning}>
                {children}
            </Varselboks>
        </section>
    );
};
