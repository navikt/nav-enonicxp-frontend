import React from 'react';
import { classNames } from '../../../utils/classnames';
import { useRouter } from 'next/router';
import { usePublicUrl } from '../../../utils/usePublicUrl';
import { Heading } from '@navikt/ds-react';
import { analyticsEvents, logAmplitudeEvent } from '../../../utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';

type DsHeadingSize = React.ComponentProps<typeof Heading>['size'];

export type LinkPanelNavnoProps = {
    href: string;
    linkText: string;
    linkGroup?: string;
    linkTextSize?: DsHeadingSize;
    linkUnderline?: 'default' | 'onHover';
    linkColor?: 'blue' | 'black';
    icon?: React.ReactNode;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

// This component wraps only the link text in an anchor tag, although the whole panel is clickable as a navigation
// element. This is meant to improve the experience when using screen readers on link panels with rich content.
// For simpler link panels with only a brief text content, consider using <LinkPanelNavnoSimple> instead.
export const LinkPanelNavno = ({
    href,
    linkText,
    linkGroup,
    linkTextSize = 'medium',
    linkUnderline = 'default',
    linkColor = 'blue',
    icon,
    children,
    ...divProps
}: LinkPanelNavnoProps) => {
    const router = useRouter();
    const { url, canRouteClientSide } = usePublicUrl(href);
    const { layoutConfig } = useLayoutConfig();

    const handleClick = (e) => {
        divProps.onClick?.(e);
        if (e.defaultPrevented) {
            return;
        }

        // TODO: rewrite this for commonality with LenkeBase and other implementations
        logAmplitudeEvent(analyticsEvents.NAVIGATION, {
            komponent: 'Lenkepanel navno',
            lenkegruppe: linkGroup,
            seksjon: linkGroup || layoutConfig.title,
            destinasjon: url,
            lenketekst: linkText,
        });

        e.preventDefault();
        if (canRouteClientSide) {
            router.push(url);
        } else {
            window.location.href = url;
        }
    };

    return (
        <div
            {...divProps}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key !== 'Enter') {
                    return;
                }

                handleClick(e);
            }}
            onMouseOver={(e) => {
                divProps.onMouseOver?.(e);
                if (canRouteClientSide) {
                    router.prefetch(url);
                }
            }}
            className={classNames(
                'linkPanelNavno',
                icon && 'linkPanelWithIcon',
                divProps.className
            )}
            tabIndex={0}
            role={'link'}
        >
            {icon && <div className={'linkPanelNavnoIcon'}>{icon}</div>}
            <div>
                <a
                    href={url}
                    className={classNames(
                        'linkPanelNavnoLink',
                        linkUnderline === 'onHover' && 'underlineToggle',
                        linkColor === 'black' && 'linkBlack',
                        'navds-heading',
                        `navds-heading--${linkTextSize}`
                    )}
                    tabIndex={-1}
                >
                    {linkText}
                </a>
                {children && (
                    <div className={classNames('linkPanelNavnoIngress')}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
