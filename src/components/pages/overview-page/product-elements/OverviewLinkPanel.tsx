import { MiniCard } from 'components/_common/card/MiniCard';
import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { OverviewPageProductLink } from 'types/content-props/overview-props';

import style from './ProductLink.module.scss';

type Props = {
    product: OverviewPageProductLink;
    illustration: AnimatedIconsProps;
};

export const OverviewLinkPanel = ({ product, illustration }: Props) => {
    const link: LinkProps = {
        url: product.url,
        text: product.title,
    };

    return (
        <MiniCard
            link={link}
            type={CardType.Product}
            illustration={illustration}
            className={style.productLink}
        />
    );
};
