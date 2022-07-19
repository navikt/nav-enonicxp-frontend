import { MiniCard } from 'components/_common/card/MiniCard';
import { CardType } from 'types/card';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { LinkProps } from 'types/link-props';
import { classNames } from 'utils/classnames';

import style from './ProductLink.module.scss';

type ProductLinkProps = {
    product: SimplifiedProductData;
    visible: boolean;
};
export const ProductLink = ({ product, visible }: ProductLinkProps) => {
    const link: LinkProps = {
        url: product.path,
        text: product.sortTitle,
    };

    return (
        <MiniCard
            link={link}
            type={CardType.Product}
            illustration={product.illustration}
            className={classNames(style.productLink, !visible && style.hidden)}
        />
    );
};
