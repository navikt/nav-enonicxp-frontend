import { MiniCard } from 'components/_common/card/MiniCard';
import { CardType } from 'types/card';
import { LinkProps } from 'types/link-props';
import { OverviewPageProductItem } from 'types/content-props/overview-props';
import { logger } from 'srcCommon/logger';

import style from './ProductLink.module.scss';

type Props = {
    product: OverviewPageProductItem;
};

export const OverviewLinkPanel = ({ product }: Props) => {
    const { title, illustration, productLinks } = product;

    const productLink = productLinks[0];

    if (!productLink?.url) {
        logger.error(`No url set for overview link panel ${title}`);
        return null;
    }

    const link: LinkProps = {
        url: productLink.url,
        text: title,
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
