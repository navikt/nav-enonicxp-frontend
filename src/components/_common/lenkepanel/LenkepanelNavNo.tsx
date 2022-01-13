import React from 'react';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { BEM, classNames } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';

const bem = BEM('lenkepanel-navno');

export type LenkepanelProps = {
    href: string;
    tittel: string;
    ikon?: React.ReactNode;
    vertikal?: boolean;
    separator?: boolean;
    component?: string;
    linkGroup?: string;
    className?: string;
    children?: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LenkepanelNavNo = ({
    href,
    tittel,
    ikon,
    vertikal,
    separator,
    className,
    component,
    linkGroup,
    children,
    ...rest
}: LenkepanelProps) => {
    return (
        <LinkPanel
            href={href}
            className={classNames(
                bem(),
                vertikal && bem('vertikal'),
                className
            )}
            border={true}
            as={(props) => (
                <LenkeBase
                    href={href}
                    component={component}
                    linkGroup={linkGroup}
                    analyticsLabel={tittel}
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
            {...rest}
        >
            {ikon && <div className={bem('ikon')}>{ikon}</div>}
            <div className={bem('innhold')}>
                <LinkPanel.Title>{tittel}</LinkPanel.Title>
                {separator && <hr className={bem('separator')} />}
                {children && <div className={bem('ingress')}>{children}</div>}
            </div>
        </LinkPanel>
    );
};

export default LenkepanelNavNo;
