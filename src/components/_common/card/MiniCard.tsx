import { LinkProps } from 'types/link-props';
import { BodyLong } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { useCardState } from './useCard';
import { Interaction } from 'types/interaction';
import { usePageConfig } from 'store/hooks/usePageConfig';

import style from './MiniCard.module.scss';

export type MiniKortProps = {
    link: LinkProps;
    illustration?: AnimatedIconsProps;
    type: CardType;
};

export const MiniCard = (props: MiniKortProps) => {
    const { link, illustration, type } = props;
    const { text } = link;
    const { isHovering, cardInteractionHandler } = useCardState();
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
                    className={style.illustration}
                    illustration={illustration}
                    isHovering={isHovering}
                    placement={IllustrationPlacements.SMALL_CARD}
                    preferStaticIllustration={pageConfig.editorView === 'edit'}
                />
                <BodyLong className={style.title}>{text}</BodyLong>
            </>
        </Card>
    );
};
