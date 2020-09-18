import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { enonicPathToAppPath, isNavnoPath } from '../../../utils/enonic-id';
import './LenkepanelPluss.less';

export type LenkepanelProps = {
    url: string;
    tittel: string;
    ikon?: React.ReactElement;
    separator?: boolean;
    className?: string;
    id?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactElement;
};

const LenkepanelPluss = ({
    url,
    tittel,
    ikon,
    separator,
    className,
    id,
    onClick,
    children,
}: LenkepanelProps) => {
    const isInternalUrl = isNavnoPath(url);

    return (
        <LenkepanelBase
            href={isInternalUrl ? enonicPathToAppPath(url) : url}
            className={`lenkepanel-pluss ${className || ''}`}
            id={id}
            border={true}
            onClick={onClick}
        >
            <div className={'lenkepanel-pluss__innhold'}>
                {ikon}
                <Undertittel className={'lenkepanel__heading'}>
                    {tittel}
                </Undertittel>
                {separator && <hr className={'lenkepanel-pluss__separator'} />}
                {children && (
                    <div className={'lenkepanel-pluss__ingress'}>
                        {children}
                    </div>
                )}
            </div>
        </LenkepanelBase>
    );
};

export default LenkepanelPluss;
