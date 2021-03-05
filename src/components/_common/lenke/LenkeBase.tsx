import React from 'react';
import {
    isInternalUrl,
    isNofollowUrl,
    getRelativeUrlIfInternal,
} from 'utils/urls';
import { logLinkClick } from 'utils/amplitude';
import Link from 'next/link';
import globalState from '../../../globalState';

type Props = {
    href: string;
    onClick?: (e: React.MouseEvent) => void;
    component?: string;
    linkGroup?: string;
    analyticsLabel?: string;
    children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LenkeBase = ({
    href,
    onClick,
    component,
    linkGroup,
    analyticsLabel,
    children,
    ...rest
}: Props) => {
    const _href = getRelativeUrlIfInternal(href, globalState.isDraft) || '/';
    const analyticsLinkText =
        analyticsLabel || (typeof children === 'string' ? children : undefined);

    const linkElement = (
        <a
            href={_href}
            onClick={(e) => {
                logLinkClick(_href, analyticsLinkText, component, linkGroup);
                onClick?.(e);
            }}
            rel={isNofollowUrl(_href) ? 'nofollow' : undefined}
            {...rest}
        >
            {children}
        </a>
    );

    return isInternalUrl(_href) ? (
        <Link href={_href} passHref={true}>
            {linkElement}
        </Link>
    ) : (
        linkElement
    );
};
