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

export const LenkepanelNavnoSimple = ({
    href,
    analyticsLinkGroup,
    icon,
    children,
    className,
    ...rest
}: Props) => {
    return (
        <LinkCard className={classNames(style.lenkepanel, className)}>
            {icon && <LinkCard.Icon className={style.icon}>{icon}</LinkCard.Icon>}
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase
                        {...rest}
                        href={href}
                        analyticsComponent={'Lenkepanel navno enkel'}
                        analyticsLinkGroup={analyticsLinkGroup}
                    >
                        {children}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
        </LinkCard>
    );
};
