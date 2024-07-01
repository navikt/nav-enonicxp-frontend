import React from 'react';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { LinkProps } from 'types/link-props';
import { useCard } from './useCard';

import style from './LargeCardV2.module.scss';

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

export const LargeCardV2 = (props: Props) => {
    const { link, description, type, tagline, illustration } = props;

    const hasIllustration = illustration && cardTypesWithIllustration.has(type);

    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    return (
        <div {...userEventProps} className={style.container}>
            {hasIllustration && (
                <IllustrationStatic illustration={illustration} className={style.illustration} />
            )}
            <div>
                <LenkeBase className={style.link} href={link.url} {...analyticsProps}>
                    <BodyShort className={style.linkText} size="large">
                        {link.text}
                    </BodyShort>
                </LenkeBase>
                <BodyLong className={style.description}>{description}</BodyLong>
                <BodyShort className={style.tagline} size="medium">
                    {tagline}
                </BodyShort>
            </div>
        </div>
    );
};
