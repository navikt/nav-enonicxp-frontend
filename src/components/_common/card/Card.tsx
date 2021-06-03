import { LargeCard, StortKortProps } from './LargeCard';
import { MiniCard, MiniKortProps } from './MiniCard';
import { MicroCard, MikroKortProps } from './MicroCard';
import { CardSize } from 'types/card';

import './Card.less';

type KortProps = { size: CardSize } & StortKortProps &
    MiniKortProps &
    MikroKortProps;

export const Card = (props: KortProps) => {
    const { link, size, type, icon, description, category } = props;

    if (size === CardSize.Micro) {
        return <MicroCard link={link} type={type} />;
    }

    if (size === CardSize.Mini) {
        return <MiniCard link={link} icon={icon} type={type} />;
    }

    return (
        <LargeCard
            link={link}
            icon={icon}
            description={description}
            category={category}
            type={type}
        />
    );
};
