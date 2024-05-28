import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';
import { CardSize, CardType } from 'types/card';

import style from './MiniCardV2.module.scss';

export type MiniCardProps = {
    link: LinkProps;
    type: CardType;
    tagline?: string;
};

export const MiniCardV2 = ({ link, type, tagline }: MiniCardProps) => {
    const { analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <LenkeBase className={style.container} href={link.url} {...analyticsProps}>
            <div className={style.textContainer}>
                <BodyShort className={style.linkText} size="medium">
                    {link.text}
                </BodyShort>
                {tagline && (
                    <BodyShort className={style.tagline} size="medium">
                        {tagline}
                    </BodyShort>
                )}
            </div>
            <ArrowRightIcon className={style.arrow} fontSize="1.25rem" />
        </LenkeBase>
    );
};
