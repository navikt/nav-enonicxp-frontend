import React from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import style from './LinkPanelNavnoSimple.module.scss';

type Props = {
    href: string;
    analyticsLinkGroup?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    iconClassname?: string;
} & React.ComponentProps<typeof LenkeBase>;

// This component is meant to be used with "simple" content, ie just a line of text
// and an optional icon. Use <LinkPanelNavno>-component for panels with more complex
// content
export const LinkPanelNavnoSimple = ({
    href,
    analyticsLinkGroup,
    icon,
    children,
    className,
    iconClassname,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            {...rest}
            href={href}
            className={classNames(style.linkPanel, icon && style.withIcon, className)}
            analyticsComponent={'Lenkepanel navno enkel'}
            analyticsLinkGroup={analyticsLinkGroup}
        >
            {icon && <div className={classNames(iconClassname, style.icon)}>{icon}</div>}
            <div className={classNames('navds-heading', 'navds-heading--medium')}>
                <span className={style.text}>{children}</span>
            </div>
        </LenkeBase>
    );
};
