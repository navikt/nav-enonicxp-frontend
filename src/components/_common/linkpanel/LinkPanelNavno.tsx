import React from 'react';
import { classNames } from '../../../utils/classnames';
import { useRouter } from 'next/router';
import { usePublicUrl } from '../../../utils/usePublicUrl';
import { Heading } from '@navikt/ds-react';
import { LenkeBase } from '../lenke/LenkeBase';

type DsHeadingSize = React.ComponentProps<typeof Heading>['size'];

export type LinkPanelNavnoProps = {
    href: string;
    linkText: string;
    linkTextSize?: DsHeadingSize;
    linkUnderline?: 'default' | 'onHover';
    linkColor?: 'blue' | 'black';
    icon?: React.ReactNode;
    analyticsLinkGroup?: string;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

// This component wraps only the link text in an anchor tag, although the whole panel is clickable as a navigation
// element. This is meant to improve the experience when using screen readers on link panels with rich content.
// For simpler link panels with only a brief text content, consider using <LinkPanelNavnoSimple> instead.
export const LinkPanelNavno = ({
    href,
    linkText,
    linkTextSize = 'medium',
    linkUnderline = 'default',
    linkColor = 'blue',
    icon,
    analyticsLinkGroup,
    children,
    ...elementAttribs
}: LinkPanelNavnoProps) => {
    return (
        <div
            className={classNames(
                'linkPanelNavno',
                icon && 'linkPanelWithIcon',
                elementAttribs.className
            )}
        >
            {icon && <div className={'linkPanelNavnoIcon'}>{icon}</div>}
            <div className="linkPanelNavnoTextContent">
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
                </div>
            <div>
                <LenkeBase
                    {...elementAttribs}
                    href={href}
                    className={classNames(
                        'linkPanelNavnoLink',
                        'navds-heading',
                        `navds-heading--${linkTextSize}`,
                        linkUnderline === 'onHover' && 'underlineToggle',
                        linkColor === 'black' && 'linkBlack'
                    )}
                    analyticsComponent={'Lenkepanel navno'}
                    analyticsLinkGroup={analyticsLinkGroup}
                    analyticsLabel={linkText}
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
