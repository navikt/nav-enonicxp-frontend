import React from 'react';
import { classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';

import style from './LinkPanelNavnoSimple.module.scss';

type Props = {
    href: string;
    linkGroup?: string;
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
    linkGroup,
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
            component={'Lenkepanel navno enkel'}
            linkGroup={linkGroup}
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
                        linkUnderline === 'onHover' && style.underlineOnHover,
                        linkUnderline === 'none' && style.underlineNone,
                        linkColor === 'black' && style.black
                    )}
                >
                    {children}
                </span>
            </div>
        </LenkeBase>
    );
};
