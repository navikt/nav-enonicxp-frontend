import React from 'react';
import { CardSize, CardType } from 'types/card';
import { BEM, classNames } from '../../../utils/classnames';

import './Card.less';
import { LenkeBase } from '../lenke/LenkeBase';
import { LinkProps } from 'types/link-props';

const bem = BEM('card');

type CardProps = {
    children: React.ReactChild;
    link: LinkProps;
    type: CardType;
    size: CardSize;
};

export const Card = (props: CardProps) => {
    const { children, link, type, size } = props;
    const { text, url } = link;

    return (
        <LenkeBase
            href={url}
            title={text}
            className={classNames(bem(), bem(type), bem(size))}
            analyticsLabel={link.text}
        >
            <div className={classNames(bem('wrapper'))}>{children}</div>
        </LenkeBase>
    );
};
