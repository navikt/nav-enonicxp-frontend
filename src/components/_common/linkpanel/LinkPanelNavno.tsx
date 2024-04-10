import React from 'react';
import { Heading } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import styles from './LinkPanelNavno.module.scss';

type DsHeadingSize = React.ComponentProps<typeof Heading>['size'];

type Props = {
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
}: Props) => {
    return (
        <div
            className={classNames(
                styles.linkPanelNavno,
                icon && styles.linkPanelWithIcon,
                elementAttribs.className
            )}
        >
            {icon && <div className={styles.linkPanelNavnoIcon}>{icon}</div>}
            <div className="linkPanelNavnoTextContent">
                <span>
                    <LenkeBase
                        {...elementAttribs}
                        href={href}
                        className={classNames(
                            styles.linkPanelNavnoLink,
                            'navds-heading',
                            `navds-heading--${linkTextSize}`,
                            linkUnderline === 'onHover' && 'underline',
                            linkColor === 'black' && styles.linkBlack
                        )}
                        analyticsComponent={'Lenkepanel navno'}
                        analyticsLinkGroup={analyticsLinkGroup}
                        analyticsLabel={linkText}
                    >
                        {linkText}
                    </LenkeBase>
                </span>
                {children && <div className={styles.linkPanelNavnoIngress}>{children}</div>}
            </div>
        </div>
    );
};
