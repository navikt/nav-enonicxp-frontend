import { ContentCommonProps, ContentType } from './_content-common';
import { ProductDataMixin } from '../component-props/_mixins';
import { ThemedArticlePageTaxonomy, ToolsPageTaxonomy } from '../taxonomies';
import { OfficeDetailsData } from './office-details-props';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentListProps } from './content-list-props';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutProps } from 'types/component-props/layouts';
import { ProductDetailType } from './product-details';

export type ProductPageData = ProductDataMixin;
export type ThemedArticlePageData = Omit<ProductDataMixin, 'taxonomy'> & {
    taxonomy: ThemedArticlePageTaxonomy[];
};
export type GuidePageData = ProductDataMixin;
export type ProductDetailsData = {
    detailType: Exclude<ProductDetailType, ProductDetailType.ALL_PRODUCTS>;
};
export type SituationPageData = ProductDataMixin;
export type OfficePageData = ProductDataMixin & {
    officeData: OfficeDetailsData;
};
export type ToolsPageData = Omit<ProductDataMixin, 'taxonomy'> & {
    taxonomy: ToolsPageTaxonomy[];
};
export type GenericPageData = ProductDataMixin;

export type OfficeEditorialPageData = {
    title: string;
} & ProductDataMixin;

export type CurrentTopicPageData = Omit<ProductDataMixin, 'illustration'>;

export type PressLandingPageData = Partial<{
    title: string;
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
    page: PageWithSideMenusProps;
};

export type ProductDetailsProps = ContentCommonProps & {
    type: ContentType.ProductDetails;
    data: ProductDetailsData;
    page: LayoutProps;
};

export type ThemedArticlePageProps = ContentCommonProps & {
    type: ContentType.ThemedArticlePage;
    data: ThemedArticlePageData;
    page: PageWithSideMenusProps;
};

export type GuidePageProps = ContentCommonProps & {
    type: ContentType.GuidePage;
    data: GuidePageData;
    page: PageWithSideMenusProps;
};

export type SituationPageProps = ContentCommonProps & {
    type: ContentType.SituationPage;
    data: SituationPageData;
    page: SingleColPageProps;
};

export type OfficeEditorialPageProps = ContentCommonProps & {
    type: ContentType.OfficeEditorialPage;
    data: OfficeEditorialPageData;
    page: LayoutProps;
};

export type OfficeBranchPageProps = ContentCommonProps & {
    type: ContentType.OfficeBranchPage;
    data: OfficeDetailsData;
    editorial: OfficeEditorialPageProps;
};

export type OfficePageProps = ContentCommonProps & {
    type: ContentType.OfficePage;
    data: OfficePageData;
    page: LayoutProps;
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
    page: PageWithSideMenusProps;
};

export type PressLandingPageProps = ContentCommonProps & {
    type: ContentType.PressLandingPage;
    data: PressLandingPageData;
};
