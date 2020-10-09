import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { enonicPathToAppPath, isEnonicPath } from 'utils/paths';
import Link from 'next/link';
import { BEM } from 'utils/bem';
import { logLinkClick } from '../../../../utils/amplitude';
import './LenkepanelPluss.less';

export type LenkepanelProps = {
    href: string;
    tittel: string;
    ikon?: React.ReactElement;
    separator?: boolean;
    className?: string;
    id?: string;
    onClick?: (event: React.MouseEvent) => void;
    children?: React.ReactElement;
};

const LenkepanelPluss = ({
    href,
    tittel,
    ikon,
    separator,
    className,
    id,
    onClick,
    children,
}: LenkepanelProps) => {
    const isInternalUrl = isEnonicPath(href);
    const _href = (isInternalUrl ? enonicPathToAppPath(href) : href) || '/';
    const bem = BEM('lenkepanel-pluss');

    return (
        <LenkepanelBase
            href={_href}
            className={`${bem()} ${className || ''}`}
            id={id}
            border={true}
            onClick={(e) => {
                logLinkClick(_href, tittel);
                onClick?.(e);
            }}
            linkCreator={(props) =>
                isInternalUrl ? (
                    <Link href={props.href} passHref={true}>
                        <a {...props} />
                    </Link>
                ) : (
                    <a {...props} />
                )
            }
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

export default LenkepanelPluss;
