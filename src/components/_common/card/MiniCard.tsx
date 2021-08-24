import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';
import { BodyLong } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';

import './MiniCard.less';
import { Card } from './Card';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { useCardState } from './useCard';
import { Interaction } from 'types/interaction';
import { usePageConfig } from 'store/hooks/usePageConfig';

export type MiniKortProps = {
    link: LinkProps;
    illustration?: AnimatedIconsProps;
    type: CardType;
};

const bem = BEM('card');

export const MiniCard = (props: MiniKortProps) => {
    const { link, illustration, type } = props;
    const { text } = link;

    const { isHovering, isPressed, cardInteractionHandler } = useCardState();
    const { pageConfig } = usePageConfig();

    return (
        <Card
            link={link}
            type={type}
            size={CardSize.Mini}
            interactionHandler={(type: Interaction) =>
                cardInteractionHandler(type)
            }
        >
            <>
                <Illustration
                    illustration={illustration}
                    placement={IllustrationPlacements.SMALL_CARD}
                    className="card__illustration"
                    isHovering={isHovering}
                    isPressed={isPressed}
                    preferStaticIllustration={pageConfig.editorView === 'edit'}
                />
                <BodyLong className={bem('title')}>{text}</BodyLong>
            </>
        </Card>
    );
};
