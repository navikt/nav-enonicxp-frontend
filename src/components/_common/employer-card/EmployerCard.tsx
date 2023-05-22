import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { MiniCard } from '../card/MiniCard';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';

import styles from './EmployerCard.module.scss';

type EmployerCardProps = {
    illustration?: AnimatedIconsProps;
    path: string;
    title: string;
};

export const EmployerCard = ({
    illustration,
    path,
    title,
}: EmployerCardProps) => {
    const link: LinkProps = {
        url: path,
        text: title,
    };
    return (
        <MiniCard
            illustration={illustration}
            link={link}
            type={CardType.EmployerFrontpage}
            className={styles.employerCard}
        />
    );
};
