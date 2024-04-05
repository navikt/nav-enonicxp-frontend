import { ContentCommonProps, ContentType } from './_content-common';
import { AlternativeAudience, ProductDataMixin } from 'types/component-props/_mixins';
import { ThemedArticlePageTaxonomy, ToolsPageTaxonomy } from 'types/taxonomies';
import { OfficeDetailsData } from './office-details-props';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { ContentListProps } from './content-list-props';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutComponentProps } from 'types/component-props/layouts';
import { ProductDetailType } from './product-details';

export type DynamicPageProps = ContentCommonProps & {
    type: ContentType.DynamicPage;
};

export type ProductPageProps = ContentCommonProps & {
    type: ContentType.ProductPage;
    data: ProductDataMixin & {
        alternativeAudience?: AlternativeAudience;
        relatedSituations?: SituationPageProps[];
    };
    page: PageWithSideMenusProps;
};

export type ProductDetailsProps = ContentCommonProps & {
    type: ContentType.ProductDetails;
    data: {
        detailType: Exclude<ProductDetailType, ProductDetailType.ALL_PRODUCTS>;
    };
    page: LayoutComponentProps;
};

export type ThemedArticlePageProps = ContentCommonProps & {
    type: ContentType.ThemedArticlePage;
    data: Omit<ProductDataMixin, 'taxonomy'> & {
        taxonomy: ThemedArticlePageTaxonomy[];
        alternativeAudience?: AlternativeAudience;
        relatedSituations?: SituationPageProps[];
    };
    page: PageWithSideMenusProps;
};

export type GuidePageProps = ContentCommonProps & {
    type: ContentType.GuidePage;
    data: ProductDataMixin & {
        alternativeAudience?: AlternativeAudience;
        relatedSituations?: SituationPageProps[];
    };
    page: PageWithSideMenusProps;
};

export type SituationPageProps = ContentCommonProps & {
    type: ContentType.SituationPage;
    data: ProductDataMixin;
    page: SingleColPageProps;
};

export type OfficeEditorialPageProps = ContentCommonProps & {
    type: ContentType.OfficeEditorialPage;
    data: {
        title: string;
    } & ProductDataMixin;
    page: LayoutComponentProps;
};

export type OfficeBranchPageProps = ContentCommonProps & {
    type: ContentType.OfficeBranchPage;
    data: OfficeDetailsData;
    editorial: OfficeEditorialPageProps;
};

export type CurrentTopicPageProps = ContentCommonProps & {
    type: ContentType.CurrentTopicPage;
    data: Omit<ProductDataMixin, 'illustration'>;
};

export type ToolsPageProps = ContentCommonProps & {
    type: ContentType.ToolsPage;
    data: Omit<ProductDataMixin, 'taxonomy'> & {
        taxonomy: ToolsPageTaxonomy[];
    };
};

export type GenericPageProps = ContentCommonProps & {
    type: ContentType.GenericPage;
    data: ProductDataMixin;
    page: PageWithSideMenusProps;
};

export type PressLandingPageProps = ContentCommonProps & {
    type: ContentType.PressLandingPage;
    data: Partial<{
        title: string;
        pressCall: ProcessedHtmlProps;
        pressNews: ContentListProps;
        shortcuts: ContentListProps;
        moreNewsUrl: string;
    }>;
};
