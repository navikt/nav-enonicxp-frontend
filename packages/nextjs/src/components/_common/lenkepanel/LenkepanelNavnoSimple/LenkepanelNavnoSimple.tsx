import React, { PropsWithChildren } from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import style from './LenkepanelNavnoSimple.module.scss';

type Props = PropsWithChildren<{
    href: string;
    analyticsLinkGroup?: string;
    icon?: React.ReactNode;
}> &
    React.ComponentProps<typeof LenkeBase>;

// This component is meant to be used with "simple" content, ie just a line of text
// and an optional icon. Use <LenkepanelNavno>-component for panels with more complex
// content
export const LenkepanelNavnoSimple = ({
    href,
    analyticsLinkGroup,
    icon,
    children,
    className,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            {...rest}
            href={href}
            className={classNames(style.lenkepanel, icon && style.withIcon, className)}
            analyticsComponent={'Lenkepanel navno enkel'}
            analyticsLinkGroup={analyticsLinkGroup}
        >
            {icon && <div className={style.icon}>{icon}</div>}
            <div className={classNames('navds-heading', 'navds-heading--medium')}>
                <span className={style.text}>{children}</span>
            </div>
        </LenkeBase>
    );
};
