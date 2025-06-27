import React from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { Button } from 'components/_common/button/Button';
import styles from './LinkPanelNavno.module.scss';

type Props = {
    href: string;
    linkText: string;
    linkColor?: 'blue' | 'black';
    analyticsLinkGroup?: string;
    children?: React.ReactNode;
    onClickEvent?: (e: any) => void;
} & React.HTMLAttributes<HTMLAnchorElement>;

export const LinkPanelNavno = ({
    href,
    linkText,
    linkColor = 'blue',
    analyticsLinkGroup,
    children,
    onClickEvent,
    ...elementAttribs
}: Props) => {
    const textClassNames = classNames(
        'navds-heading',
        'navds-heading--medium',
        linkColor === 'black' && styles.linkBlack
    );

    return (
        <div className={classNames(styles.linkPanelNavno, elementAttribs.className)}>
            <div className="linkPanelNavnoTextContent">
                {onClickEvent ? (
                    <Button
                        {...elementAttribs}
                        href={href}
                        className={classNames(styles.clickArea, textClassNames)}
                        analyticsComponent="Lenkepanel navno"
                        onClick={onClickEvent}
                        lenkestyling
                    >
                        {linkText}
                    </Button>
                ) : (
                    <LenkeBase
                        {...elementAttribs}
                        href={href}
                        className={classNames(styles.linkPanelNavnoLink, textClassNames)}
                        analyticsComponent="Lenkepanel navno"
                        analyticsLinkGroup={analyticsLinkGroup}
                        analyticsLabel={linkText}
                    >
                        {linkText}
                    </LenkeBase>
                )}
                {children && <div className={styles.linkPanelNavnoIngress}>{children}</div>}
            </div>
        </div>
    );
};
