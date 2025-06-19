import React from 'react';
import { Button as DsButton, ButtonProps } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { XpImageProps } from 'types/media';
import { XpImage } from 'components/_common/image/XpImage';

import { AnalyticsEvents, logAnalyticsEvent } from 'utils/analytics';
import { onlyText } from 'utils/react-children';
import { innholdsTypeMap } from 'types/content-props/_content-common';
import { usePageContentProps } from 'store/pageContext';
import { getDecoratorParams } from 'utils/decorator-utils';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import style from './Button.module.scss';

type Props = {
    href?: string;
    variant?: ButtonProps['variant'];
    size?: ButtonProps['size'];
    xpIcon?: XpImageProps;
    dsIcon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    disabled?: boolean;
    prefetch?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    className?: string;
    children: React.ReactNode;
    analyticsEvent?: AnalyticsEvents;
    analyticsComponent?: string;
    analyticsLabel?: string;
    lenkestyling?: boolean;
    typeButton?: boolean;
};

export const Button = ({
    href,
    variant = 'secondary',
    size = 'medium',
    xpIcon,
    dsIcon,
    iconPosition,
    fullWidth,
    disabled,
    prefetch,
    onClick,
    className,
    children,
    analyticsEvent,
    analyticsComponent,
    analyticsLabel,
    lenkestyling = false,
    typeButton = false,
}: Props) => {
    const contentProps = usePageContentProps();
    const { context } = getDecoratorParams(contentProps);
    const { layoutConfig } = useLayoutConfig();
    const analyticsData = {
        komponent: analyticsComponent,
        seksjon: layoutConfig.title,
        lenketekst: analyticsLabel || onlyText(children),
        målgruppe: context,
        innholdstype: innholdsTypeMap[contentProps.type],
    };

    return (
        <DsButton
            as={LenkeBase}
            href={href || '#'}
            className={classNames(
                style.button,
                fullWidth && style.buttonFullWidth,
                className,
                lenkestyling && style.lenkestyling
            )}
            onClick={(e) => {
                logAnalyticsEvent(analyticsEvent || AnalyticsEvents.NAVIGATION, analyticsData);
                if (!href) {
                    e.preventDefault();
                }
                onClick?.(e);
            }}
            prefetch={prefetch}
            variant={variant}
            size={size}
            disabled={disabled}
            type={typeButton ? 'button' : 'submit'}
            icon={
                xpIcon ? (
                    <XpImage imageProps={xpIcon} className={style.button__icon} maxWidth={64} />
                ) : (
                    dsIcon
                )
            }
            iconPosition={iconPosition}
        >
            {children}
        </DsButton>
    );
};
