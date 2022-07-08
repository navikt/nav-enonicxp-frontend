import { LinkProps } from 'types/link-props';
import { Heading, BodyLong, BodyShort } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { useCardState } from './useCard';
import { Interaction } from 'types/interaction';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { classNames } from 'utils/classnames';

import style from './LargeCard.module.scss';

enum LayoutVariation {
    DEFAULT = 'Default',
    SITUATION = 'Situation',
}

export type StortKortProps = {
    link: LinkProps;
    illustration?: AnimatedIconsProps;
    description: string;
    category: string;
    type: CardType;
};

export const LargeCard = (props: StortKortProps) => {
    const { link, description, type, category, illustration } = props;
    const { text } = link;
    const hasIllustration =
        illustration &&
        (type === CardType.Product ||
            type === CardType.Situation ||
            type === CardType.ThemedArticle ||
            type === CardType.Guide);
    const { isHovering, cardInteractionHandler } = useCardState();
    const { pageConfig } = usePageConfig();

    const layoutVariation =
        type === CardType.Situation
            ? LayoutVariation.SITUATION
            : LayoutVariation.DEFAULT;

    return (
        <Card
            link={link}
            type={type}
            size={CardSize.Large}
            interactionHandler={(type: Interaction) =>
                cardInteractionHandler(type)
            }
        >
            <div
                className={classNames(
                    style.cardWrapper,
                    style[`cardWrapper${layoutVariation}`]
                )}
            >
                {hasIllustration && (
                    <Illustration
                        illustration={illustration}
                        placement={IllustrationPlacements.LARGE_CARD}
                        className={style.illustration}
                        isHovering={isHovering}
                        preferStaticIllustration={
                            pageConfig.editorView === 'edit'
                        }
                    />
                )}
                <Heading level="3" size="medium" className={style.title}>
                    {text}
                </Heading>
                <div className={style.textContainer}>
                    <BodyLong className={style.description}>
                        {description}
                    </BodyLong>
                    <BodyShort className={style.category}>{category}</BodyShort>
                </div>
            </div>
        </Card>
    );
};
