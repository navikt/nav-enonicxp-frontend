import React from 'react';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { classNames } from 'utils/classnames';
import { useCard } from 'components/_common/card/useCard';

import sharedStyle from 'components/_common/card//Card.module.scss';
import style from './MicroCard.module.scss';

export const MicroCard = ({ link, type }: { link: LinkProps; type: CardType }) => {
    const { analyticsProps } = useCard({ type, size: CardSize.Micro, link });
    return (
        <LenkeBase
            href={link.url}
            {...analyticsProps}
            className={classNames(sharedStyle.card, sharedStyle.inline, style.container)}
        >
            <div className={classNames(sharedStyle.bed, style.micro, type)}>{link.text}</div>
        </LenkeBase>
    );
};
