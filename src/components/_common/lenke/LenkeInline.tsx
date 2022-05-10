import React from 'react';
import { LenkeBase } from './LenkeBase';
import { classNames } from '../../../utils/classnames';
import style from './LenkeInline.module.scss';

type Props = {
    href: string;
    className?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeInline = ({ href, className, children, ...rest }: Props) => (
    <LenkeBase
        href={href}
        className={classNames(style.lenkeInline, className)}
        {...rest}
    >
        {children}
    </LenkeBase>
);
