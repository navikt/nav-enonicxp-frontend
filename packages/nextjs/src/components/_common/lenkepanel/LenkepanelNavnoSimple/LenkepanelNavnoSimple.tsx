import React, { PropsWithChildren } from 'react';
import { LinkCard } from '@navikt/ds-react';
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
        <LinkCard>
            {icon && (
                <LinkCard.Icon>
                    <div className={style.icon}>{icon}</div>
                </LinkCard.Icon>
            )}
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase
                        {...rest}
                        href={href}
                        className={classNames(style.lenkepanel, icon && style.withIcon, className)}
                        analyticsComponent={'Lenkepanel navno enkel'}
                        analyticsLinkGroup={analyticsLinkGroup}
                    >
                        {children}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            {/* <div className={classNames('navds-heading', 'navds-heading--medium')}>
                <span className={style.text}>{children}</span>
            </div> */}
        </LinkCard>
    );
};
