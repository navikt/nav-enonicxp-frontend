import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
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
    header?: string;
    className?: string;
};

export const MiniCard = (props: MiniKortProps) => {
    const { link, illustration, type, header, className } = props;
    const { text } = link;
    const { isHovering, userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    const { pageConfig } = usePageConfig();

    return (
        <>
            {header && (
                <BodyShort size={'medium'} className={style.header}>
                    {header}
                </BodyShort>
            )}
            <div
                {...userEventProps}
                className={classNames(sharedStyle.card, className)}
            >
                <div className={classNames(sharedStyle.bed, style.mini, type)}>
                    <Illustration
                        className={style.illustration}
                        illustration={illustration}
                        isHovering={isHovering}
                        placement={IllustrationPlacements.SMALL_CARD}
                        preferStaticIllustration={
                            pageConfig.editorView === 'edit'
                        }
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
        </>
    );
};
