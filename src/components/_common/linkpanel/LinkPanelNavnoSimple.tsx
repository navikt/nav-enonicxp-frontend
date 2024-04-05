import React from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { Heading } from '@navikt/ds-react';

import style from './LinkPanelNavnoSimple.module.scss';

type DsHeadingSize = React.ComponentProps<typeof Heading>['size'];

type Props = {
    href: string;
    analyticsLinkGroup?: string;
    linkTextSize?: DsHeadingSize;
    linkUnderline?: 'default' | 'onHover' | 'none';
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
    icon,
    children,
    className,
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
            {icon && <div className={style.icon}>{icon}</div>}
            <div className={classNames('navds-heading', `navds-heading--${linkTextSize}`)}>
                <span className={style.text}>{children}</span>
            </div>
        </LenkeBase>
    );
};
