import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { Card } from './Card';
import { LenkeBase } from '../lenke/LenkeBase';
import { useCard } from './useCard';

export type MicroCardProps = {
    link: LinkProps;
    type: CardType;
};

export const MicroCard = ({ link, type }: MicroCardProps) => {
    const { analyticsProps } = useCard({ type, size: CardSize.Micro, link });
    return (
        <LenkeBase href={link.url} {...analyticsProps}>
            <span>{link.text}</span>
        </LenkeBase>
    );
};
