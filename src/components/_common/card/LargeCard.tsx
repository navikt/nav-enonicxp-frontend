import { useState } from 'react';
import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { Element, Undertittel } from 'nav-frontend-typografi';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';
import './LargeCard.less';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';

import { useCardState } from './useCard';

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

    const { isHovering, setHoverState } = useCardState();

    return (
        <Card
            link={link}
            type={type}
            size={CardSize.Large}
            onMouseEnterHandler={() => setHoverState(true)}
            onMouseLeaveHandler={() => setHoverState(false)}
        >
            <div className={type}>
                {hasIllustration && (
                    <Illustration
                        illustration={illustration}
                        placement={IllustrationPlacements.LARGE_CARD}
                        className={bem('illustration')}
                        isHovering={isHovering}
                    />
                )}
                <Undertittel tag="h3" className={bem('title')}>
                    {text}
                </Undertittel>
                <Element className={bem('description')}>{description}</Element>
                <Element className={bem('category')}>{category}</Element>
            </div>
        </Card>
    );
};
