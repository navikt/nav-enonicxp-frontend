import { LargeCard, StortKortProps } from './LargeCard';
import { MiniCard, MiniKortProps } from './MiniCard';
import { MicroCard, MikroKortProps } from './MicroCard';
import { CardSize } from 'types/card';

import './Card.less';

type CardProps = { size: CardSize; path?: string } & StortKortProps &
    MiniKortProps &
    MikroKortProps;

export const Card = (props: CardProps) => {
    const { link, size, type, illustration, description, category } = props;

    if (size === CardSize.Micro) {
        return <MicroCard link={link} type={type} />;
    }

    if (size === CardSize.Mini) {
        return <MiniCard link={link} illustration={illustration} type={type} />;
    }

    return (
        <LargeCard
            link={link}
            illustration={illustration}
            description={description}
            category={category}
            type={type}
        />
    );
};
