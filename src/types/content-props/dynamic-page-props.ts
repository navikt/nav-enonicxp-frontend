import {
    ContentDecoratorToggles,
    ContentProps,
    ContentType,
    SeoDataProps,
} from './_content-common';
import { LanguageProps } from '../language';
import { ProductDataMixin } from '../component-props/_mixins';

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

export interface ProductPageProps extends ContentProps {
    __typename: ContentType.ProductPage;
    data: ProductPageData;
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
    __typename: ContentType.SituationPage | ContentType.EmployerSituationPage;
    data: SituationPageData;
}

export interface ToolsPageProps extends ContentProps {
    __typename: ContentType.ToolsPage;
    data: ToolsPageData;
}
