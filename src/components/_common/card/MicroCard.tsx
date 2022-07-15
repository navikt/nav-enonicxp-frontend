import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from '../lenke/LenkeBase';
import { useCard } from './useCard';

import style from './Card.module.scss';
import { classNames } from 'utils/classnames';

export type MicroCardProps = {
    link: LinkProps;
    type: CardType;
};

export const MicroCard = ({ link, type }: MicroCardProps) => {
    const { analyticsProps } = useCard({ type, size: CardSize.Micro, link });
    return (
        <LenkeBase
            href={link.url}
            {...analyticsProps}
            className={classNames(style.card, style.inline)}
        >
            <div className={classNames(style.bed, type, CardSize.Micro)}>
                {link.text}
            </div>
        </LenkeBase>
    );
};
