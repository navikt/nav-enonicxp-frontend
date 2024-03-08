import React from 'react';
import { LenkeBase } from './LenkeBase';
import { classNames } from '../../../utils/classnames';
import style from './LenkeInline.module.scss';
import { AnalyticsEvents } from 'utils/amplitude';

type Props = {
    href: string;
    className?: string;
    analyticsEvent?: AnalyticsEvents;
    analyticsLinkGroup?: string;
    analyticsComponent?: string;
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
