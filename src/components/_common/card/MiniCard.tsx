import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from './useCard';

import sharedStyle from './Card.module.scss';
import style from './MiniCard.module.scss';

export type MiniKortProps = {
    link: LinkProps;
    type: CardType;
    header?: string;
    className?: string;
};

export const MiniCard = (props: MiniKortProps) => {
    const { link, type, header, className } = props;
    const { text } = link;
    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <>
            {header && (
                <BodyShort size={'medium'} className={style.header}>
                    {header}
                </BodyShort>
            )}
            <div {...userEventProps} className={classNames(sharedStyle.card, className)}>
                <div className={classNames(sharedStyle.bed, style.mini, type)}>
                    <LenkeBase
                        className={classNames(sharedStyle.lenkeBaseOverride, style.title)}
                        href={link.url}
                        {...analyticsProps}
                    >
                        {text}
                    </LenkeBase>
                </div>
            </div>
        </>
    );
};
