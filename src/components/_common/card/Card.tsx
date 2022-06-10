import React from 'react';
import { CardSize, CardType } from 'types/card';
import { classNames } from '../../../utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { Interaction } from 'types/interaction';
import { useLayoutConfig } from '../../../store/hooks/useLayoutConfig';

import style from './Card.module.scss';

type CardProps = {
    children: React.ReactChild;
    link: LinkProps;
    type: CardType;
    size: CardSize;
    interactionHandler?: (type: Interaction) => void;
};

export const Card = (props: CardProps) => {
    const { children, link, type, size, interactionHandler } = props;
    const { text, url } = link;
    const handleUserEvent = (e: React.MouseEvent | React.TouchEvent): void => {
        const eventType = e.type.toString() as keyof typeof Interaction;
        const type: Interaction = Interaction[eventType];

        if (interactionHandler) {
            interactionHandler(type);
        }
    };
    const { layoutConfig } = useLayoutConfig();

    return (
        <LenkeBase
            href={url}
            title={text}
            linkGroup={layoutConfig.title}
            analyticsLabel={link.text}
            component={`card-${type}`}
            className={classNames(
                style.card,
                size === CardSize.Micro ? style.inline : ''
            )}
            onMouseEnter={handleUserEvent}
            onMouseLeave={handleUserEvent}
            onMouseDown={handleUserEvent}
            onMouseUp={handleUserEvent}
            onTouchStart={handleUserEvent}
            onTouchEnd={handleUserEvent}
            onTouchCancel={handleUserEvent}
            onTouchMove={handleUserEvent}
        >
            <div className={classNames(style.bed, type, size)}>
                {children}
            </div>
        </LenkeBase>
    );
};
