import React from 'react';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import style from './LenkepanelNavNo.module.scss';

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
            className={classNames(
                style.lenkepanelNavno,
                vertikal && style.vertikal,
                className
            )}
            as={(props) => (
                <LenkeBase
                    href={href}
                    analyticsComponent={component}
                    analyticsLinkGroup={linkGroup}
                    analyticsLabel={tittel}
                    {...props}
                >
                    {props.children}
                </LenkeBase>
            )}
            {...rest}
        >
            {ikon && <div className={style.ikon}>{ikon}</div>}
            <div className={style.innhold}>
                <Heading
                    level="2"
                    size="small"
                    className={'navds-link-panel__title'}
                >
                    {tittel}
                </Heading>
                {separator && <hr className={style.separator} />}
                {children && <div>{children}</div>}
            </div>
        </LinkPanel>
    );
};

export default LenkepanelNavNo;
