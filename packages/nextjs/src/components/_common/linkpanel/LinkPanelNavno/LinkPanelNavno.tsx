import React from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';

import styles from './LinkPanelNavno.module.scss';

type Props = {
    href: string;
    linkText: string;
    linkColor?: 'blue' | 'black';
    analyticsLinkGroup?: string;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

// This component wraps only the link text in an anchor tag, although the whole panel is clickable as a navigation
// element. This is meant to improve the experience when using screen readers on link panels with rich content.
// For simpler link panels with only a brief text content, consider using <LinkPanelNavnoSimple> instead.
export const LinkPanelNavno = ({
    href,
    linkText,
    linkColor = 'blue',
    analyticsLinkGroup,
    children,
    ...elementAttribs
}: Props) => {
    return (
        <div className={classNames(styles.linkPanelNavno, elementAttribs.className)}>
            <div className="linkPanelNavnoTextContent">
                <LenkeBase
                    {...elementAttribs}
                    href={href}
                    className={classNames(
                        styles.linkPanelNavnoLink,
                        'navds-heading',
                        'navds-heading--medium',
                        linkColor === 'black' && styles.linkBlack
                    )}
                    analyticsComponent={'Lenkepanel navno'}
                    analyticsLinkGroup={analyticsLinkGroup}
                    analyticsLabel={linkText}
                >
                    {linkText}
                </LenkeBase>
                {children && <div className={styles.linkPanelNavnoIngress}>{children}</div>}
            </div>
        </div>
    );
};
