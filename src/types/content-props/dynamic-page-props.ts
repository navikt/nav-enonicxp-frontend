import { ContentType, ContentCommonProps } from './_content-common';
import { LanguageProps } from '../language';
import {
    ProductDataMixin,
    SimplifiedProductData,
    ProductDetailsDataMixin,
} from '../component-props/_mixins';
import { ProductDetailType as OverviewType } from './product-details';
import { ThemedArticlePageTaxonomy, ToolsPageTaxonomy } from '../taxonomies';
import { OfficeBranchData } from './office-branch-props';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentListProps } from './content-list-props';

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
export type OfficeEditorialPageData = {
    title: string;
    ingress?: string;
    externalProductUrl?: string;
} & DynamicPageData;
export type CurrentTopicPageData = Omit<ProductDataMixin, 'illustration'> &
    DynamicPageData;

export type PressLandingPageData = Partial<{
    pressCall: ProcessedHtmlProps;
    pressNews: ContentListProps;
    shortcuts: ContentListProps;
    moreNewsUrl: string;
    maxNewsCount: string;
    maxShortcutsCount: string;
}> &
    DynamicPageData;

export interface DynamicPageProps extends ContentCommonProps {
    type: ContentType.DynamicPage;
    data: DynamicPageData;
}

export interface ProductPageProps extends ContentCommonProps {
    type: ContentType.ProductPage;
    data: ProductPageData;
}

export interface ProductDetailsProps extends ContentCommonProps {
    type: ContentType.ProductDetails;
    data: ProductDetailsData;
}

export interface ThemedArticlePageProps extends ContentCommonProps {
    type: ContentType.ThemedArticlePage;
    data: ThemedArticlePageData;
}

export interface GuidePageProps extends ContentCommonProps {
    type: ContentType.GuidePage;
    data: GuidePageData;
}
export interface SituationPageProps extends ContentCommonProps {
    type: ContentType.SituationPage;
    data: SituationPageData;
}
export interface OfficeEditorialPageProps extends ContentCommonProps {
    __typename: ContentType.OfficeEditorialPage;
    data: OfficeEditorialPageData;
}
export type OfficeBranchPageProps = ContentCommonProps & {
    __typename: ContentType.OfficeEditorialPage;
    data: OfficeBranchData;
    editorial: OfficeEditorialPageProps;
};
export interface CurrentTopicPageProps extends ContentCommonProps {
    type: ContentType.CurrentTopicPage;
    data: CurrentTopicPageData;
}

export interface ToolsPageProps extends ContentCommonProps {
    type: ContentType.ToolsPage;
    data: ToolsPageData;
}

export interface GenericPageProps extends ContentCommonProps {
    type: ContentType.GenericPage;
    data: GenericPageData;
}

export interface OverviewPageProps extends ContentCommonProps {
    type: ContentType.Overview;
    data: OverviewPageData;
}
export interface PressLandingPageProps extends ContentCommonProps {
    type: ContentType.PressLandingPage;
    data: PressLandingPageData;
}
