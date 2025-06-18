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
    return (
        <div className={classNames(styles.linkPanelNavno, elementAttribs.className)}>
            <div className="linkPanelNavnoTextContent">
                {onClickEvent ? (
                    <Button href={'#'} onClick={(e) => onClickEvent(e)} lenkestyling>
                        {linkText}
                    </Button>
                ) : (
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
                )}
                {children && <div className={styles.linkPanelNavnoIngress}>{children}</div>}
            </div>
        </div>
    );
};
