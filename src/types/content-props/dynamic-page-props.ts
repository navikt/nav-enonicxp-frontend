import { ContentType, CustomContentCommonProps } from './_content-common';
import { LanguageProps } from '../language';
import {
    ProductDataMixin,
    SimplifiedProductData,
    ProductDetailsDataMixin,
} from '../component-props/_mixins';
import { ProductDetailType as OverviewType } from './product-details';

export type DynamicPageData = Partial<{
    customPath: string;
    languages: LanguageProps[];
    description: string;
}>;

export type ProductPageData = ProductDataMixin & DynamicPageData;
export type ThemedArticlePageData = ProductDataMixin & DynamicPageData;
export type GuidePageData = ProductDataMixin & DynamicPageData;
export type ProductDetailsData = ProductDetailsDataMixin & DynamicPageData;
export type SituationPageData = ProductDataMixin & DynamicPageData;
export type ToolsPageData = ProductDataMixin & DynamicPageData;
export type OverviewPageData = Partial<{
    productList: SimplifiedProductData[];
    overviewType: OverviewType;
}> &
    ProductDataMixin &
    DynamicPageData;

export interface DynamicPageProps extends CustomContentCommonProps {
    __typename: ContentType.DynamicPage;
    data: DynamicPageData;
}

export interface ProductPageProps extends CustomContentCommonProps {
    __typename: ContentType.ProductPage;
    data: ProductPageData;
}

export interface ProductDetailsProps extends CustomContentCommonProps {
    __typename: ContentType.ProductDetails;
    data: ProductDetailsData;
}

export interface ThemedArticlePageProps extends CustomContentCommonProps {
    __typename: ContentType.ThemedArticlePage;
    data: ThemedArticlePageData;
}

export interface GuidePageProps extends CustomContentCommonProps {
    __typename: ContentType.GuidePage;
    data: GuidePageData;
}
export interface SituationPageProps extends CustomContentCommonProps {
    __typename: ContentType.SituationPage;
    data: SituationPageData;
}

export interface ToolsPageProps extends CustomContentCommonProps {
    __typename: ContentType.ToolsPage;
    data: ToolsPageData;
}

export interface OverviewPageProps extends CustomContentCommonProps {
    __typename: ContentType.Overview;
    data: OverviewPageData;
}
