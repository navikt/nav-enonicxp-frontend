import React, { PropsWithChildren } from 'react';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { classNames } from 'utils/classnames';
import { Chevron } from 'components/_common/chevron/Chevron';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import style from './LenkeStandalone.module.scss';

type Props = PropsWithChildren<{
    href: string;
    label?: string;
    className?: string;
    tekstClassName?: string;
    component?: string;
    linkGroup?: string;
    withChevron?: boolean;
    withArrow?: boolean;
    analyticsLabel?: string;
}> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeStandalone = ({
    href,
    label,
    className,
    tekstClassName,
    component,
    linkGroup,
    withChevron = false,
    withArrow = false,
    children,
    analyticsLabel,
    ...rest
}: Props) => {
    const link = (
        <LenkeBase
            {...rest}
            href={href}
            className={classNames('aksel-link', withChevron && style.withChevron, className)}
            analyticsComponent={component}
            analyticsLinkGroup={linkGroup}
            analyticsLabel={analyticsLabel || (typeof children === 'string' ? children : undefined)}
        >
            <BodyShort className={classNames(style.lenketekst, tekstClassName)} as={'span'}>
                {withChevron && (
                    <span className={style.iconContainer}>
                        <Chevron className={style.customChevronStyle} />
                    </span>
                )}
                <>{children}</>
                {withArrow && (
                    <span className={style.iconContainer}>
                        <ArrowRightIcon className={style.arrowIcon} />
                    </span>
                )}
            </BodyShort>
        </LenkeBase>
    );

    if (!label) {
        return link;
    }

    return (
        <div className={style.withLabelWrapper}>
            {link}
            <BodyLong size="small" className={style.label} as={'div'}>
                {label}
            </BodyLong>
        </div>
    );
};
