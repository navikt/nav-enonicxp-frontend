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
        <section className={style.container}>
            <Varselboks
                variant={'warning'}
                size={size}
                className={classNames(style.warning, whiteBg && style.whiteBg)}
            >
                {children}
            </Varselboks>
        </section>
    );
};
