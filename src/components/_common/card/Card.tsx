import React from 'react';
import { CardSize, CardType } from 'types/card';
import { BEM, classNames } from '../../../utils/classnames';

import './Card.less';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';
import { Interaction } from 'types/interaction';

const bem = BEM('card');

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

    return (
        <LenkeBase
            href={url}
            title={text}
            className={classNames(bem(), bem(type), bem(size))}
            analyticsLabel={link.text}
            onMouseEnter={handleUserEvent}
            onMouseLeave={handleUserEvent}
            onMouseDown={handleUserEvent}
            onMouseUp={handleUserEvent}
            onTouchStart={handleUserEvent}
            onTouchEnd={handleUserEvent}
            onTouchCancel={handleUserEvent}
            onTouchMove={handleUserEvent}
        >
            <div className={classNames(bem('wrapper'))}>{children}</div>
        </LenkeBase>
    );
};
