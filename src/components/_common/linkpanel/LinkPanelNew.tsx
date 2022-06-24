import React from 'react';
import { LenkeBase } from '../lenke/LenkeBase';
import { classNames } from '../../../utils/classnames';
import { useRouter } from 'next/router';
import { isAppUrl } from '../../../utils/urls';
import { usePublicHref } from '../../../utils/usePublicHref';

import style from './LinkPanelNew.module.scss';

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
    ...divProps
}: Props) => {
    const router = useRouter();
    const publicHref = usePublicHref(href);

    const Tag = as || 'div';

    return (
        <Tag
            {...divProps}
            onClick={(e) => {
                divProps.onClick?.(e);

                if (e.defaultPrevented) {
                    return;
                }

                e.preventDefault();
                if (isAppUrl(publicHref)) {
                    router.push(publicHref);
                } else {
                    window.location.href = publicHref;
                }
            }}
            className={classNames(style.linkPanel, divProps.className)}
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
