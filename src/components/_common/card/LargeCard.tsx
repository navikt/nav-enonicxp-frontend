import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { Heading, BodyLong, BodyShort } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';
import './LargeCard.less';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';

import { useCardState } from './useCard';
import { Interaction } from 'types/interaction';
import { usePageConfig } from 'store/hooks/usePageConfig';

export type StortKortProps = {
    link: LinkProps;
    illustration?: AnimatedIconsProps;
    description: string;
    category: string;
    type: CardType;
};

const bem = BEM('card');

export const LargeCard = (props: StortKortProps) => {
    const { link, description, type, category, illustration } = props;
    const { text } = link;

    const hasIllustration =
        illustration &&
        (type === CardType.Product || type === CardType.Situation);

    const { isHovering, isPressed, cardInteractionHandler } = useCardState();
    const { pageConfig } = usePageConfig();

    return (
        <Card
            link={link}
            type={type}
            size={CardSize.Large}
            interactionHandler={(type: Interaction) =>
                cardInteractionHandler(type)
            }
        >
            <div className={type}>
                {hasIllustration && (
                    <Illustration
                        illustration={illustration}
                        placement={IllustrationPlacements.LARGE_CARD}
                        className={bem('illustration')}
                        isHovering={isHovering}
                        isPressed={isPressed}
                        preferStaticIllustration={
                            pageConfig.editorView === 'edit'
                        }
                    />
                )}
                <Heading level="3" size="medium" className={bem('title')}>
                    {text}
                </Heading>
                <BodyLong className={bem('description')}>
                    {description}
                </BodyLong>
                <BodyShort className={bem('category')}>{category}</BodyShort>
            </div>
        </Card>
    );
};
