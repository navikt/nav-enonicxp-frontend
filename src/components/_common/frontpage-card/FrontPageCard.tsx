import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { MiniCardV1 } from 'components/_common/card/MiniCardV1';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';

import styles from './FrontPageCard.module.scss';

type Props = {
    illustration?: AnimatedIconsProps;
    path: string;
    title: string;
    type: CardType;
    withFallbackIllustration?: boolean;
};

export const FrontPageCard = ({
    illustration,
    path,
    title,
    type,
    withFallbackIllustration,
}: Props) => {
    const link: LinkProps = {
        url: path,
        text: title,
    };

    return (
        <MiniCardV1
            illustration={illustration}
            link={link}
            type={type}
            className={styles.frontpageCard}
            preferStaticIllustration={true}
            withFallbackIllustration={withFallbackIllustration}
        />
    );
};
