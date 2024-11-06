import React from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import style from 'components/_common/lenke/lenkeInline/LenkeInline.module.scss';

type Props = React.ComponentProps<typeof LenkeBase>;

export const LenkeInline = ({ className, children, ...rest }: Props) => (
    <LenkeBase className={classNames(style.lenkeInline, className)} {...rest}>
        {children}
    </LenkeBase>
);
