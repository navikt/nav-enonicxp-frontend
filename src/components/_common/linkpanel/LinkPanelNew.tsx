import React from 'react';
import { LenkeBase } from '../lenke/LenkeBase';
import { classNames } from '../../../utils/classnames';
import { NextRouter, useRouter } from 'next/router';
import { isAppUrl } from '../../../utils/urls';
import { usePublicHref } from '../../../utils/usePublicHref';

import style from './LinkPanelNew.module.scss';

const enterKeyCode = 13;

const navigate = (router: NextRouter, href: string) => {
    if (isAppUrl(href)) {
        router.push(href);
    } else {
        window.location.href = href;
    }
};

type Props<As = React.ElementType> = {
    linkText: string;
    href: string;
    linkProps?: Omit<React.HTMLAttributes<HTMLAnchorElement>, 'href'>;
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    as?: As;
    children?: React.ReactNode;
} & React.HTMLAttributes<As>;

export const LinkPanelNew = ({
    linkText,
    href,
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
                const { which } = e;

                if (which !== enterKeyCode) {
                    return;
                }

                handleClick(e);
            }}
            className={classNames(style.linkPanel, elementProps.className)}
            tabIndex={0}
        >
            <LenkeBase
                {...linkProps}
                href={publicHref}
                className={classNames(
                    style.link,
                    linkProps?.className,
                    'navds-heading',
                    'navds-heading--medium'
                )}
                tabIndex={-1}
            >
                {linkText}
            </LenkeBase>
            {children && (
                <div
                    {...contentProps}
                    className={classNames(
                        style.content,
                        contentProps?.className
                    )}
                >
                    {children}
                </div>
            )}
        </Tag>
    );
};
