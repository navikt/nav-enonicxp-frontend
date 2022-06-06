import { OverviewPageProps } from 'types/content-props/dynamic-page-props';
import { ProductDetailType } from 'types/content-props/product-details';
import { OverviewPageDetailsPanel } from './ProductDetailsPanel';
import { ProductLink } from './ProductLink';

type ProductLinkProps = {
    product: any;
    isVisible: boolean;
    overviewType: ProductDetailType;
    pageProps: OverviewPageProps;
};

export const ProductItem = ({
    product,
    isVisible,
    overviewType,
    pageProps,
}: ProductLinkProps) => {
    return overviewType === ProductDetailType.ALL_PRODUCTS ? (
        <ProductLink product={product} isVisible={isVisible} />
    ) : (
        <OverviewPageDetailsPanel
            productDetails={product}
            pageProps={pageProps}
            visible={isVisible}
            detailType={overviewType}
            key={product._id}
        />
    );
};
