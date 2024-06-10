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

import style from './LargeCardV1.module.scss';
import sharedStyle from './Card.module.scss';

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

export const LargeCardV1 = (props: Props) => {
    const { link, description, type, tagline, illustration, preferStaticIllustration } = props;
    const { text } = link;

    const hasIllustration = illustration && cardTypesWithIllustration.has(type);

    const { isHovering, userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    const { editorView } = usePageContentProps();

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
                        <Illustration
                            illustration={illustration}
                            className={style.illustration}
                            isHovering={isHovering}
                            preferStaticIllustration={
                                editorView === 'edit' || preferStaticIllustration
                            }
                        />
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
