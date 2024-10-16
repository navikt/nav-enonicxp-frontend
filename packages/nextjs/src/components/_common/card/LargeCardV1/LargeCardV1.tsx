import React from 'react';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';

import sharedStyle from 'components/_common/card//Card.module.scss';
import style from './LargeCardV1.module.scss';

enum LayoutVariation {
    DEFAULT = 'Default',
    SITUATION = 'Situation',
}

const cardTypesWithIllustration: ReadonlySet<CardType> = new Set<CardType>([
    CardType.Product,
    CardType.Situation,
    CardType.ThemedArticle,
    CardType.Guide,
]);

type Props = {
    tagline?: string;
    description?: string;
    illustration?: PictogramsProps;
    link: LinkProps;
    type: CardType;
};

export const LargeCardV1 = (props: Props) => {
    const { link, description, type, tagline, illustration } = props;
    const { text } = link;

    const hasIllustration = illustration && cardTypesWithIllustration.has(type);

    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    const layoutVariation =
        type === CardType.Situation ? LayoutVariation.SITUATION : LayoutVariation.DEFAULT;

    return (
        <div {...userEventProps} className={classNames(sharedStyle.card)}>
            <div className={classNames(sharedStyle.bed, type, CardSize.Large)}>
                <div
                    className={classNames(
                        style.cardWrapper,
                        style[`cardWrapper${layoutVariation}`]
                    )}
                >
                    {hasIllustration && (
                        <Illustration illustration={illustration} className={style.illustration} />
                    )}
                    <LenkeBase
                        href={link.url}
                        {...analyticsProps}
                        className={classNames(style.title, sharedStyle.lenkeBaseOverride)}
                    >
                        {text}
                    </LenkeBase>
                    <div className={style.textContainer}>
                        <BodyLong className={style.description}>{description}</BodyLong>
                        <BodyShort className={style.tagline}>{tagline}</BodyShort>
                    </div>
                </div>
            </div>
        </div>
    );
};
