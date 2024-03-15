import React from 'react';
import { classNames } from 'utils/classnames';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { CardSize, CardType } from 'types/card';
import { BodyLong, BodyShort } from '@navikt/ds-react';
import { Illustration } from '../illustration/Illustration';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from './useCard';
import { usePageContext } from 'store/pageContext';

import style from './LargeCard.module.scss';
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
    category?: string;
    description?: string;
    illustration?: AnimatedIconsProps;
    link: LinkProps;
    type: CardType;
    preferStaticIllustration?: boolean;
};

export const LargeCard = (props: Props) => {
    const {
        link,
        description,
        type,
        category,
        illustration,
        preferStaticIllustration,
    } = props;
    const { text } = link;

    const hasIllustration = illustration && cardTypesWithIllustration.has(type);

    const { isHovering, userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    const { editorView } = usePageContext();

    const layoutVariation =
        type === CardType.Situation
            ? LayoutVariation.SITUATION
            : LayoutVariation.DEFAULT;

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
                                editorView === 'edit' ||
                                preferStaticIllustration
                            }
                        />
                    )}
                    <LenkeBase
                        href={link.url}
                        {...analyticsProps}
                        className={classNames(
                            style.title,
                            sharedStyle.lenkeBaseOverride
                        )}
                    >
                        {text}
                    </LenkeBase>
                    <div className={style.textContainer}>
                        <BodyLong className={style.description}>
                            {description}
                        </BodyLong>
                        <BodyShort className={style.category}>
                            {category}
                        </BodyShort>
                    </div>
                </div>
            </div>
        </div>
    );
};
