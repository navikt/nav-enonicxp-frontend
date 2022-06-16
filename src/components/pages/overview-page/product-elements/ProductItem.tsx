import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { ProductDetailType } from 'types/content-props/product-details';
import { ProductDetailsPanel } from './ProductDetailsPanel';
import { ProductLink } from './ProductLink';

type ProductLinkProps = {
    product: any;
    visible: boolean;
    overviewType: ProductDetailType;
    pageProps: OverviewPageProps;
};

export const ProductItem = ({
    product,
    visible,
    overviewType,
    pageProps,
}: ProductLinkProps) => {
    return overviewType === ProductDetailType.ALL_PRODUCTS ? (
        <ProductLink product={product} visible={visible} />
    ) : (
        <ProductDetailsPanel
            productDetails={product}
            pageProps={pageProps}
            visible={visible}
            detailType={overviewType}
        />
    );
};
