import { ContentType, ContentCommonProps } from './_content-common';
import { LanguageProps } from '../language';
import {
    ProductDataMixin,
    SimplifiedProductData,
    ProductDetailsDataMixin,
} from '../component-props/_mixins';
import { ProductDetailType as OverviewType } from './product-details';

export type DynamicPageData = Partial<{
    languages: LanguageProps[];
    description: string;
}>;

export type ProductPageData = ProductDataMixin & DynamicPageData;
export type ThemedArticlePageData = ProductDataMixin & DynamicPageData;
export type GuidePageData = ProductDataMixin & DynamicPageData;
export type ProductDetailsData = ProductDetailsDataMixin & DynamicPageData;
export type SituationPageData = ProductDataMixin & DynamicPageData;
export type ToolsPageData = ProductDataMixin & DynamicPageData;
export type GenericPageData = ProductDataMixin & DynamicPageData;
export type OverviewPageData = Partial<{
    productList: SimplifiedProductData[];
    overviewType: OverviewType;
}> &
    ProductDataMixin &
    DynamicPageData;
export type OfficeEditorialPageData = {
    title: string;
    ingress?: string;
    externalProductUrl?: string;
} & DynamicPageData;

export interface DynamicPageProps extends ContentCommonProps {
    __typename: ContentType.DynamicPage;
    data: DynamicPageData;
}

export interface ProductPageProps extends ContentCommonProps {
    __typename: ContentType.ProductPage;
    data: ProductPageData;
}

export interface ProductDetailsProps extends ContentCommonProps {
    __typename: ContentType.ProductDetails;
    data: ProductDetailsData;
}

export interface ThemedArticlePageProps extends ContentCommonProps {
    __typename: ContentType.ThemedArticlePage;
    data: ThemedArticlePageData;
}

export interface GuidePageProps extends ContentCommonProps {
    __typename: ContentType.GuidePage;
    data: GuidePageData;
}
export interface SituationPageProps extends ContentCommonProps {
    __typename: ContentType.SituationPage;
    data: SituationPageData;
}
export interface OfficeEditorialPageProps extends ContentCommonProps {
    __typename: ContentType.OfficeEditorialPage;
    data: OfficeEditorialPageData;
}

export interface ToolsPageProps extends ContentCommonProps {
    __typename: ContentType.ToolsPage;
    data: ToolsPageData;
}

export interface GenericPageProps extends ContentCommonProps {
    __typename: ContentType.GenericPage;
    data: GenericPageData;
}

export interface OverviewPageProps extends ContentCommonProps {
    __typename: ContentType.Overview;
    data: OverviewPageData;
}
