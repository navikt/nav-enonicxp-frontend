import React from 'react';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { CardSize, CardType } from 'types/card';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { usePageContentProps } from 'store/pageContext';
import { useCard } from './useCard';

import style from './LargeCardV2.module.scss';
import sharedStyle from './Card.module.scss';
import { IllustrationStatic } from '../illustration/static/IllustrationStatic';

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
    illustration?: AnimatedIconsProps;
    link: LinkProps;
    type: CardType;
    preferStaticIllustration?: boolean;
};

export const LargeCardV2 = (props: Props) => {
    const { link, description, type, tagline, illustration, preferStaticIllustration } = props;
    const { text } = link;

    const hasIllustration = illustration && cardTypesWithIllustration.has(type);

    const { analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    const layoutVariation =
        type === CardType.Situation ? LayoutVariation.SITUATION : LayoutVariation.DEFAULT;

    return (
        <LenkeBase className={classNames(style.container)} href={link.url} {...analyticsProps}>
            {hasIllustration && (
                <IllustrationStatic illustration={illustration} className={style.illustration} />
            )}
            <div className={style.textContainer}>
                <BodyShort className={style.linkText} size="medium">
                    {link.text}
                </BodyShort>
                <BodyLong className={style.description}>{description}</BodyLong>
                <BodyShort className={style.tagline} size="medium">
                    {tagline}
                </BodyShort>
            </div>
        </LenkeBase>
    );
};
