import React, { PropsWithChildren } from 'react';
import { LinkCard } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import style from './LenkepanelNavNo.module.scss';

type Props = PropsWithChildren<{
    href: string;
    tittel: string;
    ikon?: React.ReactNode;
    vertikal?: boolean;
    separator?: boolean;
    component?: string;
    linkGroup?: string;
    className?: string;
}> &
    React.AnchorHTMLAttributes<HTMLAnchorElement>;

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
        <LinkCard
            arrow={!vertikal}
            arrowPosition='center'
            className={classNames(style.lenkepanelNavno, vertikal && style.vertikal, className)}
        >
            {ikon && <LinkCard.Icon className={style.ikon}>{ikon}</LinkCard.Icon>}
            <LinkCard.Title as='h2'>
                <LinkCard.Anchor asChild>
                    <LenkeBase
                        {...rest}
                        href={href}
                        analyticsComponent={component}
                        analyticsLinkGroup={linkGroup}
                        analyticsLabel={tittel}
                        className={style.lenkebase}
                    >
                        {tittel}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description className={style.innhold}>
                {separator && <hr className={style.separator} />}
                {children && <div>{children}</div>}
            </LinkCard.Description>
        </LinkCard>
    );
};

export default LenkepanelNavNo;
