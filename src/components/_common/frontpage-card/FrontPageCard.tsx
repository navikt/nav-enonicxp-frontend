import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { MiniCard } from '../card/MiniCard';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';

import styles from './FrontPageCard.module.scss';

type FrontPageCardProps = {
    illustration?: AnimatedIconsProps;
    path: string;
    title: string;
    type: CardType;
    fallbackIllustration?: boolean;
};

export const FrontPageCard = ({
    illustration,
    path,
    title,
    type,
    fallbackIllustration,
}: FrontPageCardProps) => {
    const link: LinkProps = {
        url: path,
        text: title,
    };

    return (
        <MiniCard
            illustration={illustration}
            link={link}
            type={type}
            className={styles.frontpageCard}
            preferStaticIllustration={true}
            fallbackIllustration={fallbackIllustration}
        />
    );
};
