import { PictogramsProps } from 'types/content-props/pictograms';
import { MiniCardV1 } from 'components/_common/card/MiniCardV1/MiniCardV1';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';
import { classNames } from 'utils/classnames';

import style from 'components/_common/pageUpdatedInfo/PageUpdatedInfo.module.scss';
import styles from './FrontPageCard.module.scss';

type Props = {
    illustration?: PictogramsProps;
    path: string;
    title: string;
    type: CardType;
    tryFallbackIllustration?: boolean;
};

export const FrontPageCard = ({
    illustration,
    path,
    title,
    type,
    tryFallbackIllustration,
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
            className={classNames(styles.frontpageCard, style.pageUpdatedInfo)}
            tryFallbackIllustration={tryFallbackIllustration}
        />
    );
};
