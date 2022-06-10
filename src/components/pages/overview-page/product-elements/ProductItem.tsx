import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { ProductDetailType } from 'types/content-props/product-details';
import { OverviewPageDetailsPanel } from './ProductDetailsPanel';
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
        <OverviewPageDetailsPanel
            productDetails={product}
            pageProps={pageProps}
            visible={visible}
            detailType={overviewType}
            key={product._id}
        />
    );
};
