import { LinkProps } from 'types/link-props';
import { BodyLong, BodyShort, Detail } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';

import { classNames } from 'utils/classnames';

import chevron from '../lottie-animations/chevron-blue.json';

import style from './ShortcutCard.module.scss';
import { IllustrationAnimated } from '../illustration/IllustrationAnimated';
import { useCardState } from './useCard';
import { Interaction } from 'types/interaction';
import {
    AnimatedIconsData,
    AnimatedIconsProps,
} from 'types/content-props/animated-icons';
import { ContentType } from 'types/content-props/_content-common';

export type ShortcutCardProps = {
    link: LinkProps;
    className?: string;
};

export const ShortcutCard = (props: ShortcutCardProps) => {
    const { link, className } = props;
    const { text } = link;
    const { isHovering, cardInteractionHandler } = useCardState();

    const illustration: AnimatedIconsProps = {
        __typename: ContentType.AnimatedIcons,
        data: {
            icons: [],
            lottieHover: {
                mediaText: JSON.stringify(chevron),
            },
        },
    };

    return (
        <Card
            link={link}
            type={CardType.ShortcutCard}
            size={CardSize.Mini}
            className={classNames(style.shortcutCard, className)}
            interactionHandler={(type: Interaction) =>
                cardInteractionHandler(type)
            }
        >
            <>
                <IllustrationAnimated
                    isHovering={isHovering}
                    illustration={illustration}
                    className={style.illustration}
                />
                <BodyLong className={style.title}>{text}</BodyLong>
            </>
        </Card>
    );
};
