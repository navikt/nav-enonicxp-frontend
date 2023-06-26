import { ContentType, ContentCommonProps } from './_content-common';
import {
    ProductDataMixin,
    SimplifiedProductData,
    ProductDetailsDataMixin,
} from '../component-props/_mixins';
import { ProductDetailType as OverviewType } from './product-details';
import { ThemedArticlePageTaxonomy, ToolsPageTaxonomy } from '../taxonomies';
import { OfficeDetailsData } from './office-details-props';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentListProps } from './content-list-props';

export type ProductPageData = ProductDataMixin;
export type ThemedArticlePageData = Omit<ProductDataMixin, 'taxonomy'> & {
    taxonomy: ThemedArticlePageTaxonomy[];
};
export type GuidePageData = ProductDataMixin;
export type ProductDetailsData = ProductDetailsDataMixin;
export type SituationPageData = ProductDataMixin;
export type ToolsPageData = Omit<ProductDataMixin, 'taxonomy'> & {
    taxonomy: ToolsPageTaxonomy[];
};
export type GenericPageData = ProductDataMixin;
export type OverviewPageData = Partial<{
    productList: SimplifiedProductData[];
    overviewType: OverviewType;
}> &
    ProductDataMixin;

export type OfficeEditorialPageData = {
    title: string;
} & ProductDataMixin;

export type CurrentTopicPageData = Omit<ProductDataMixin, 'illustration'>;

export type PressLandingPageData = Partial<{
    pressCall: ProcessedHtmlProps;
    pressNews: ContentListProps;
    shortcuts: ContentListProps;
    moreNewsUrl: string;
}>;

export type DynamicPageProps = ContentCommonProps & {
    type: ContentType.DynamicPage;
};

export type ProductPageProps = ContentCommonProps & {
    type: ContentType.ProductPage;
    data: ProductPageData;
};

export type ProductDetailsProps = ContentCommonProps & {
    type: ContentType.ProductDetails;
    data: ProductDetailsData;
};

export type ThemedArticlePageProps = ContentCommonProps & {
    type: ContentType.ThemedArticlePage;
    data: ThemedArticlePageData;
};

export type GuidePageProps = ContentCommonProps & {
    type: ContentType.GuidePage;
    data: GuidePageData;
};

export type SituationPageProps = ContentCommonProps & {
    type: ContentType.SituationPage;
    data: SituationPageData;
};

export type OfficeEditorialPageProps = ContentCommonProps & {
    type: ContentType.OfficeEditorialPage;
    data: OfficeEditorialPageData;
};

export type OfficeBranchPageProps = ContentCommonProps & {
    type: ContentType.OfficeBranchPage;
    data: OfficeDetailsData;
    editorial: OfficeEditorialPageProps;
};

export type CurrentTopicPageProps = ContentCommonProps & {
    type: ContentType.CurrentTopicPage;
    data: CurrentTopicPageData;
};

export type ToolsPageProps = ContentCommonProps & {
    type: ContentType.ToolsPage;
    data: ToolsPageData;
};

export type GenericPageProps = ContentCommonProps & {
    type: ContentType.GenericPage;
    data: GenericPageData;
};

export type OverviewPageProps = ContentCommonProps & {
    type: ContentType.Overview;
    data: OverviewPageData;
};

export type PressLandingPageProps = ContentCommonProps & {
    type: ContentType.PressLandingPage;
    data: PressLandingPageData;
};
