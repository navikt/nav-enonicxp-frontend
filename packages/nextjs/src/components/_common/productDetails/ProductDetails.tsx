import { ComponentMapper } from 'components/ComponentMapper';
import { OversiktMerOmLenke } from 'components/_common/card/overview-microcard/OversiktMerOmLenke';

import { ProductDetailsProps } from 'types/content-props/dynamic-page-props';
import style from './ProductDetails.module.scss';

type Props = {
    productDetails: ProductDetailsProps; //ProductDetailsPageProps;
};

export const ProductDetails = ({ productDetails }: Props) => {
    return (
        <>
            <ComponentMapper componentProps={productDetails.page} pageProps={productDetails} />
            <OversiktMerOmLenke productLinks={[]} className={style.microCard} />
        </>
    );
};
