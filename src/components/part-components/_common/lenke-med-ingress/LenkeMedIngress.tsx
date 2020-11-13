import React from 'react';
import { BEM } from '../../../../utils/bem';
import NavFrontendChevron from 'nav-frontend-chevron';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkeUstylet } from '../lenke/LenkeUstylet';
import './LenkeMedIngress.less';

type Props = {
    tittel: string;
    href: string;
    children?: React.ReactNode;
    className?: string;
    onClick?: (...args: any) => any;
};

export const LenkeMedIngress = ({
    tittel,
    href,
    children,
    className,
    onClick,
}: Props) => {
    const bem = BEM('lenke-med-ingress');

    return (
        <LenkeUstylet
            href={href}
            className={`${bem()} ${className || ''}`}
            onClick={onClick}
        >
            <div className={bem('chevron-container')}>
                <NavFrontendChevron className={bem('chevron')} />
            </div>
            <div className={bem('content')}>
                <Undertittel className={bem('tittel')}>{tittel}</Undertittel>
                {children && <div className={bem('ingress')}>{children}</div>}
            </div>
        </LenkeUstylet>
    );
};
