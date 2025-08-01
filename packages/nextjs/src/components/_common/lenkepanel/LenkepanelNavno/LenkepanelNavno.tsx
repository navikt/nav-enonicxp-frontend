import React, { PropsWithChildren } from 'react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { Button } from 'components/_common/button/Button';
import styles from './LenkepanelNavno.module.scss';

type Props = PropsWithChildren<{
    href: string;
    linkText: string;
    linkColor?: 'blue' | 'black';
    analyticsLinkGroup?: string;
    onClickEvent?: (e: any) => void;
}> &
    React.HTMLAttributes<HTMLAnchorElement>;

export const LenkepanelNavno = ({
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
        <div className={classNames(styles.lenkepanelNavno, elementAttribs.className)}>
            <div className="lenkepanelNavnoTextContent">
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
                        className={classNames(styles.lenkepanelNavnoLink, textClassNames)}
                        analyticsComponent="Lenkepanel navno"
                        analyticsLinkGroup={analyticsLinkGroup}
                        analyticsLabel={linkText}
                    >
                        {linkText}
                    </LenkeBase>
                )}
                {children && <div className={styles.lenkepanelNavnoIngress}>{children}</div>}
            </div>
        </div>
    );
};
