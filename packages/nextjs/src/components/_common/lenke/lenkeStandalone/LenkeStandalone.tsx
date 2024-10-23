import React from 'react';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { Chevron } from 'components/_common/chevron/Chevron';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import style from './LenkeStandalone.module.scss';

type Props = {
    href: string;
    label?: string;
    className?: string;
    component?: string;
    linkGroup?: string;
    withChevron?: boolean;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeStandalone = ({
    href,
    label,
    className,
    component,
    linkGroup,
    withChevron = true,
    children,
    analyticsLabel,
    ...rest
}: Props) => {
    return (
        <LenkeBase
            {...rest}
            href={href}
            className={classNames(style.navnoLenke, withChevron && style.withChevron, className)}
            analyticsComponent={component}
            analyticsLinkGroup={linkGroup}
            analyticsLabel={analyticsLabel || (typeof children === 'string' ? children : undefined)}
        >
            <BodyShort className={style.lenketekst} as={'span'}>
                {withChevron && (
                    <span className={style.iconContainer}>
                        <Chevron className={style.customChevronStyle} />
                    </span>
                )}
                <>{children}</>
            </BodyShort>
            {label && (
                <BodyLong size="small" className={style.label} as={'span'}>
                    {label}
                </BodyLong>
            )}
        </LenkeBase>
    );
};
