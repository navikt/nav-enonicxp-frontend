import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { BEM } from 'utils/bem';
import { LenkeUstylet } from '../lenke/LenkeUstylet';
import './LenkepanelNavNo.less';

export type LenkepanelProps = {
    href: string;
    tittel: string;
    ikon?: React.ReactElement;
    separator?: boolean;
    component?: string;
    linkGroup?: string;
    className?: string;
    children?: React.ReactElement | React.ReactElement[];
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const LenkepanelNavNo = ({
    href,
    tittel,
    ikon,
    separator,
    className,
    component,
    linkGroup,
    children,
    ...rest
}: LenkepanelProps) => {
    const bem = BEM('lenkepanel-navno');

    return (
        <LenkepanelBase
            href={href}
            className={`${bem()} ${className || ''}`}
            border={true}
            linkCreator={(props) => (
                <LenkeUstylet
                    href={href}
                    component={component}
                    linkGroup={linkGroup}
                    {...props}
                >
                    {props.children}
                </LenkeUstylet>
            )}
            {...rest}
        >
            {ikon && <div className={bem('ikon')}>{ikon}</div>}
            <div className={bem('innhold')}>
                <Undertittel className={'lenkepanel__heading'}>
                    {tittel}
                </Undertittel>
                {separator && <hr className={bem('separator')} />}
                {children && <div className={bem('ingress')}>{children}</div>}
            </div>
        </LenkepanelBase>
    );
};

export default LenkepanelNavNo;
