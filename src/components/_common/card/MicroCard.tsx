import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';

export type MikroKortProps = {
    link: LinkProps;
    type: CardType;
};

export const MicroCard = ({ link, type }: MikroKortProps) => {
    return (
        <Card link={link} type={type} size={CardSize.Micro}>
            <span>{link.text}</span>
        </Card>
    );
};
