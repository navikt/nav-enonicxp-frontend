import React from 'react';
import { LenkeBase } from '../lenke/LenkeBase';
import { classNames } from '../../../utils/classnames';
import { NextRouter, useRouter } from 'next/router';
import { isAppUrl } from '../../../utils/urls';
import { usePublicHref } from '../../../utils/usePublicHref';
import { Heading } from '@navikt/ds-react';

const navigate = (router: NextRouter, href: string) => {
    if (isAppUrl(href)) {
        router.push(href);
    } else {
        window.location.href = href;
    }
};

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
    const publicHref = usePublicHref(href);

    const handleClick = (e) => {
        divProps.onClick?.(e);
        if (e.defaultPrevented) {
            return;
        }
        e.preventDefault();
        navigate(router, publicHref);
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
                <LenkeBase
                    href={publicHref}
                    className={classNames(
                        'linkPanelNavnoLink',
                        linkUnderline === 'onHover' && 'underlineToggle',
                        linkColor === 'black' && 'linkBlack',
                        'navds-heading',
                        `navds-heading--${linkTextSize}`
                    )}
                    analyticsLabel={linkText}
                    component={'Lenkepanel navno'}
                    linkGroup={linkGroup}
                    tabIndex={-1}
                >
                    {linkText}
                </LenkeBase>
                {children && (
                    <div className={classNames('linkPanelNavnoIngress')}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};
