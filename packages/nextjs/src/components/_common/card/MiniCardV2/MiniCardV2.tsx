import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';
import { CardSize, CardType } from 'types/card';
import { classNames } from 'utils/classnames';

import style from './MiniCardV2.module.scss';

export type MiniCardProps = {
    link: LinkProps;
    type: CardType;
    tagline?: string;
    className?: string;
};

export const MiniCardV2 = ({ link, type, tagline, className }: MiniCardProps) => {
    const { analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <LinkCard arrowPosition="center" className={classNames(style.miniCardV2, className)}>
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase href={link.url} {...analyticsProps}>
                        {link.text}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            {tagline && <LinkCard.Footer className={style.tagline}>{tagline}</LinkCard.Footer>}
        </LinkCard>
    );
};
