import { LinkProps } from 'types/link-props';
import { BEM } from 'utils/classnames';

import { CardSize, CardType } from 'types/card';
import { Card } from './Card';

export type MikroKortProps = {
    link: LinkProps;
    type: CardType;
};

const bem = BEM('card');

export const MicroCard = ({ link, type }: MikroKortProps) => {
    return (
        <Card link={link} type={type} size={CardSize.Micro}>
            <span className={bem('title')}>{link.text}</span>
        </Card>
    );
};
