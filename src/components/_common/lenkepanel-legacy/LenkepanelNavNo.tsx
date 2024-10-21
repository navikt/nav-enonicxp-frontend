import React from 'react';
import { Heading, LinkPanel } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import style from './LenkepanelNavNo.module.scss';

type Props = {
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
}: Props) => {
    return (
        <LinkPanel
            {...rest}
            href={href}
            analyticsComponent={component}
            analyticsLinkGroup={linkGroup}
            analyticsLabel={tittel}
            className={classNames(style.lenkepanelNavno, vertikal && style.vertikal, className)}
            as={LenkeBase}
        >
            {ikon && <div className={style.ikon}>{ikon}</div>}
            <div className={style.innhold}>
                <Heading level="2" size="small" className={'navds-link-panel__title'}>
                    {tittel}
                </Heading>
                {separator && <hr className={style.separator} />}
                {children && <div>{children}</div>}
            </div>
        </LinkPanel>
    );
};

export default LenkepanelNavNo;
