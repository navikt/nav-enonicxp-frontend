import { LinkProps } from 'types/link-props';
import { Heading, BodyLong, BodyShort } from '@navikt/ds-react';
import { CardSize, CardType } from 'types/card';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { useCard } from './useCard';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { classNames } from 'utils/classnames';

import style from './LargeCard.module.scss';
import sharedStyle from './Card.module.scss';
import { LenkeBase } from '../lenke/LenkeBase';

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
    const { isHovering, userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });
    const { pageConfig } = usePageConfig();

    const layoutVariation =
        type === CardType.Situation
            ? LayoutVariation.SITUATION
            : LayoutVariation.DEFAULT;

    const describedbyId = `largecard-${link.url}`;

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
                            placement={IllustrationPlacements.LARGE_CARD}
                            className={style.illustration}
                            isHovering={isHovering}
                            preferStaticIllustration={
                                pageConfig.editorView === 'edit'
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
                        aria-details={describedbyId}
                        aria-describedby={describedbyId}
                    >
                        <Heading level="3" size="medium">
                            {text}
                        </Heading>
                    </LenkeBase>
                    <div className={style.textContainer}>
                        <BodyLong
                            className={style.description}
                            id={describedbyId}
                        >
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
