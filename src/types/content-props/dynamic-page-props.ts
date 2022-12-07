import { ContentType, ContentCommonProps } from './_content-common';
import { LanguageProps } from '../language';
import {
    ProductDataMixin,
    SimplifiedProductData,
    ProductDetailsDataMixin,
} from '../component-props/_mixins';
import { ProductDetailType as OverviewType } from './product-details';
import { ThemedArticlePageTaxonomy, ToolsPageTaxonomy } from '../taxonomies';
import { ContentListProps } from './content-list-props';
import { ProcessedHtmlProps } from 'types/processed-html-props';

export type DynamicPageData = Partial<{
    languages: LanguageProps[];
    description: string;
}>;

export type ProductPageData = ProductDataMixin & DynamicPageData;
export type ThemedArticlePageData = Omit<ProductDataMixin, 'taxonomy'> &
    DynamicPageData & { taxonomy: ThemedArticlePageTaxonomy[] };
export type GuidePageData = ProductDataMixin & DynamicPageData;
export type ProductDetailsData = ProductDetailsDataMixin & DynamicPageData;
export type SituationPageData = ProductDataMixin & DynamicPageData;
export type ToolsPageData = Omit<ProductDataMixin, 'taxonomy'> &
    DynamicPageData & { taxonomy: ToolsPageTaxonomy[] };
export type GenericPageData = ProductDataMixin & DynamicPageData;
export type OverviewPageData = Partial<{
    productList: SimplifiedProductData[];
    overviewType: OverviewType;
}> &
    ProductDataMixin &
    DynamicPageData;
export type CurrentTopicPageData = Omit<ProductDataMixin, 'illustration'> &
    DynamicPageData;

export type PressLandingPageData = Partial<{
    pressCall: ProcessedHtmlProps;
    pressNews: any;
    shortcuts: any;
}> &
    DynamicPageData;

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
export interface CurrentTopicPageProps extends ContentCommonProps {
    __typename: ContentType.CurrentTopicPage;
    data: CurrentTopicPageData;
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
export interface PressLandingPageProps extends ContentCommonProps {
    __typename: ContentType.PressLandingPage;
    data: PressLandingPageData;
}
