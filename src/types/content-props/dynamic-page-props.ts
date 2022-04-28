import {
    ContentDecoratorToggles,
    ContentProps,
    ContentType,
    SeoDataProps,
} from './_content-common';
import { LanguageProps } from '../language';
import {
    ProductDataMixin,
    SimplifiedProductData,
} from '../component-props/_mixins';

export type DynamicPageData = Partial<{
    customPath: string;
    languages: LanguageProps[];
    description: string;
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export type ProductPageData = ProductDataMixin & DynamicPageData;
export type ThemedArticlePageData = ProductDataMixin & DynamicPageData;
export type GuidePageData = ProductDataMixin & DynamicPageData;
export type SituationPageData = ProductDataMixin & DynamicPageData;
export type ToolsPageData = ProductDataMixin & DynamicPageData;
export type OverviewPageData = Partial<{
    productList: SimplifiedProductData[];
}> &
    ProductDataMixin &
    DynamicPageData;

export interface ProductPageProps extends ContentProps {
    __typename: ContentType.ProductPage;
    data: ProductPageData;
}

export interface ProductDetailsProps extends ContentProps {
    __typename: ContentType.ProductDetails;
}

export interface ThemedArticlePageProps extends ContentProps {
    __typename: ContentType.ThemedArticlePage;
    data: ThemedArticlePageData;
}

export interface GuidePageProps extends ContentProps {
    __typename: ContentType.GuidePage;
    data: GuidePageData;
}
export interface SituationPageProps extends ContentProps {
    __typename: ContentType.SituationPage;
    data: SituationPageData;
}

export interface ToolsPageProps extends ContentProps {
    __typename: ContentType.ToolsPage;
    data: ToolsPageData;
}

export interface OverviewPageProps extends ContentProps {
    __typename: ContentType.ToolsPage;
    data: OverviewPageData;
}
