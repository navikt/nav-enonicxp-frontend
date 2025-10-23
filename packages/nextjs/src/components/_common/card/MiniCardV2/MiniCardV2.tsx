import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort } from '@navikt/ds-react';
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
        <LenkeBase
            className={classNames(style.container, className)}
            href={link.url}
            {...analyticsProps}
        >
            <div className={style.textContainer}>
                <BodyLong as="span" className={style.linkText} size="large">
                    {link.text}
                </BodyLong>
                {tagline && (
                    <BodyShort as="span" className={style.tagline}>
                        {tagline}
                    </BodyShort>
                )}
            </div>
            <ArrowRightIcon aria-hidden fontSize="1.25rem" />
        </LenkeBase>
    );
};
