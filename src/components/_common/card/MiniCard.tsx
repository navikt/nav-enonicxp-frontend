import { classNames } from 'utils/classnames';

import { AnimatedIconsProps } from '../../../types/content-props/animated-icons';
import { CardSize, CardType } from 'types/card';
import { Illustration } from '../illustration/Illustration';
import { IllustrationPlacements } from 'types/illustrationPlacements';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';

import { usePageConfig } from 'store/hooks/usePageConfig';
import { useCard } from './useCard';

import sharedStyle from './Card.module.scss';
import style from './MiniCard.module.scss';

export type MiniKortProps = {
    illustration?: AnimatedIconsProps;
    link: LinkProps;
    type: CardType;
};

export const MiniCard = (props: MiniKortProps) => {
    const { link, illustration, type } = props;
    const { text } = link;
    const { isHovering, userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    const { pageConfig } = usePageConfig();

    return (
        <div {...userEventProps} className={classNames(sharedStyle.card)}>
            <div className={classNames(sharedStyle.bed, type, CardSize.Mini)}>
                <Illustration
                    className={style.illustration}
                    illustration={illustration}
                    isHovering={isHovering}
                    placement={IllustrationPlacements.SMALL_CARD}
                    preferStaticIllustration={pageConfig.editorView === 'edit'}
                />
                <LenkeBase
                    className={classNames(
                        sharedStyle.lenkeBaseOverride,
                        style.title
                    )}
                    href={link.url}
                    {...analyticsProps}
                >
                    {text}
                </LenkeBase>
            </div>
        </div>
    );
};
