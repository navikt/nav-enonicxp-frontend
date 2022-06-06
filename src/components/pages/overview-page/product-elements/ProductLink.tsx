import { MiniCard } from 'components/_common/card/MiniCard';
import { CardType } from 'types/card';
import { SimplifiedProductData } from 'types/component-props/_mixins';
import { LinkProps } from 'types/link-props';

import style from './ProductLink.module.scss';

type ProductLinkProps = {
    product: SimplifiedProductData;
    isVisible: boolean;
};
export const ProductLink = ({ product, isVisible }: ProductLinkProps) => {
    if (!isVisible) {
        return null;
    }

    const link: LinkProps = {
        url: product.path,
        text: product.sortTitle,
    };
    return (
        <div className={style.productLink}>
            <MiniCard
                link={link}
                type={CardType.Product}
                illustration={product.illustration}
            />
        </div>
    );
};
