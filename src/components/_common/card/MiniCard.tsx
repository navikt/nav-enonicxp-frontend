import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { CardSize, CardType } from 'types/card';
import { Illustration } from '../illustration/Illustration';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from './useCard';
import { usePageContextProps } from 'store/pageContext';

import sharedStyle from './Card.module.scss';
import style from './MiniCard.module.scss';

export type MiniKortProps = {
    illustration?: AnimatedIconsProps;
    link: LinkProps;
    type: CardType;
    header?: string;
    className?: string;
    preferStaticIllustration?: boolean;
    fallbackIllustration?: boolean;
};

export const MiniCard = (props: MiniKortProps) => {
    const {
        link,
        illustration,
        type,
        header,
        className,
        preferStaticIllustration,
        fallbackIllustration,
    } = props;
    const { text } = link;
    const { isHovering, userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    const { editorView } = usePageContextProps();

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
                        preferStaticIllustration={
                            preferStaticIllustration || editorView === 'edit'
                        }
                        fallbackIllustration={fallbackIllustration}
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
