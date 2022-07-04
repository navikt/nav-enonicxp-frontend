import React from 'react';
import { classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';

import style from './LinkPanelNavnoSimple.module.scss';

type Props = {
    href: string;
    analyticsLinkGroup?: string;
    linkTextSize?;
    linkUnderline?;
    linkColor?;
    icon?: React.ReactNode;
    children: React.ReactNode;
} & React.ComponentProps<typeof LenkeBase>;

// This component is meant to be used with "simple" content, ie just a line of text
// and an optional icon. Use <LinkPanelNavno>-component for panels with more complex
// content
export const LinkPanelNavnoSimple = ({
    href,
    analyticsLinkGroup,
    linkTextSize = 'medium',
    linkUnderline = 'default',
    linkColor = 'blue',
    icon,
    children,
    className,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            {...rest}
            href={href}
            className={classNames(
                style.linkPanel,
                icon && style.withIcon,
                className
            )}
            analyticsComponent={'Lenkepanel navno enkel'}
            analyticsLinkGroup={analyticsLinkGroup}
        >
            {icon && <div className={style.icon}>{icon}</div>}
            <div
                className={classNames(
                    'navds-heading',
                    `navds-heading--${linkTextSize}`
                )}
            >
                <span
                    className={classNames(
                        style.text,
                        linkUnderline === 'onHover' && style.underline,
                        linkColor === 'black' && style.black
                    )}
                >
                    {children}
                </span>
            </div>
        </LenkeBase>
    );
};
