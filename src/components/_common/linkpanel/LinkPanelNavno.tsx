import React from 'react';
import { LenkeBase } from '../lenke/LenkeBase';
import { classNames } from '../../../utils/classnames';
import { NextRouter, useRouter } from 'next/router';
import { isAppUrl } from '../../../utils/urls';
import { usePublicHref } from '../../../utils/usePublicHref';
import { Heading } from '@navikt/ds-react';

const enterKeyCode = 13;

const navigate = (router: NextRouter, href: string) => {
    if (isAppUrl(href)) {
        router.push(href);
    } else {
        window.location.href = href;
    }
};

type DsHeadingSize = React.ComponentProps<typeof Heading>['size'];

type Props<As = React.ElementType> = {
    href: string;
    linkText: string;
    linkTextSize?: DsHeadingSize;
    linkUnderline?: 'default' | 'onHover';
    linkColor?: 'blue' | 'black';
    icon?: React.ReactNode;
    linkProps?: Omit<React.HTMLAttributes<HTMLAnchorElement>, 'href'>;
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    as?: As;
    children?: React.ReactNode;
} & React.HTMLAttributes<As>;

export const LinkPanelNavno = ({
    href,
    linkText,
    linkTextSize = 'medium',
    linkUnderline = 'default',
    linkColor = 'blue',
    icon,
    linkProps,
    as,
    contentProps,
    children,
    ...elementProps
}: Props) => {
    const router = useRouter();
    const publicHref = usePublicHref(href);

    const Tag = as || 'div';

    const handleClick = (e) => {
        elementProps.onClick?.(e);

        if (e.defaultPrevented) {
            return;
        }

        e.preventDefault();
        navigate(router, publicHref);
    };

    return (
        <Tag
            {...elementProps}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.which !== enterKeyCode) {
                    return;
                }

                handleClick(e);
            }}
            className={classNames(
                'linkPanelNavno',
                icon && 'linkPanelWithIcon',
                elementProps.className
            )}
            tabIndex={0}
            role={'link'}
        >
            {icon && <div className={'linkPanelNavnoIcon'}>{icon}</div>}
            <div>
                <LenkeBase
                    {...linkProps}
                    href={href}
                    className={classNames(
                        'linkPanelNavnoLink',
                        linkUnderline === 'onHover' && 'underlineToggle',
                        linkColor === 'black' && 'linkBlack',
                        'navds-heading',
                        `navds-heading--${linkTextSize}`,
                        linkProps?.className
                    )}
                    tabIndex={-1}
                >
                    {linkText}
                </LenkeBase>
                {children && (
                    <div
                        {...contentProps}
                        className={classNames(
                            'linkPanelNavnoIngress',
                            contentProps?.className
                        )}
                    >
                        {children}
                    </div>
                )}
            </div>
        </Tag>
    );
};
