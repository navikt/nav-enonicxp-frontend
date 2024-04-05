import React from 'react';

import { classNames } from 'utils/classnames';

import { LenkeBase } from './LenkeBase';

import style from './LenkeInline.module.scss';

type Props = React.ComponentProps<typeof LenkeBase>;

export const LenkeInline = ({ className, children, ...rest }: Props) => (
    <LenkeBase className={classNames(style.lenkeInline, className)} {...rest}>
        {children}
    </LenkeBase>
);
