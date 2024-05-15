import React from 'react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from '../card/useCard';
import { CardSize, CardType } from 'types/card';

import style from './MiniCardV2.module.scss';

export type MiniKortProps = {
    link: LinkProps;
    type: CardType;
    header?: string;
    className?: string;
    preferStaticIllustration?: boolean;
    withFallbackIllustration?: boolean;
};

export const MiniCardV2 = (props: MiniKortProps) => {
    const { analyticsProps } = useCard({
        type: props.type,
        size: CardSize.Mini,
        link: props.link,
    });

    return (
        <LenkeBase className={style.container} href={props.link.url} {...analyticsProps}>
            <div className={style.textContainer}>
                <BodyShort className={style.categoryText} size="medium">
                    HELSE OG SYKDOM
                </BodyShort>
                {/* TODO: fiks hardkodet kategori-tekst. Er det gjennomtenkt hvor dette hentes fra og hva teksten skal være? */}
                <BodyShort className={style.linkText} size="medium">
                    {props.link.text}
                </BodyShort>
            </div>
            <ArrowRightIcon className={style.arrow} fontSize="1.25rem" />
        </LenkeBase>
    );
};
