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
    className?: string;
    id?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactElement | React.ReactElement[];
};

const LenkepanelNavNo = ({
    href,
    tittel,
    ikon,
    separator,
    className,
    id,
    onClick,
    children,
}: LenkepanelProps) => {
    const bem = BEM('lenkepanel-navno');

    return (
        <LenkepanelBase
            href={href}
            className={`${bem()} ${className || ''}`}
            id={id}
            border={true}
            onClick={onClick}
            linkCreator={LenkeUstylet}
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
