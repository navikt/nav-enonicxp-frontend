import { AlternativeAudience, ProductDataMixin } from 'types/component-props/_mixins';
import { ThemedArticlePageTaxonomy, ToolsPageTaxonomy } from 'types/taxonomies';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { PageWithSideMenusProps } from 'types/component-props/pages/page-with-side-menus';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';
import { LayoutComponentProps } from 'types/component-props/layouts';
import { OptionSetSingle } from 'types/util-types';
import { ContentListProps } from './content-list-props';
import { OfficeDetailsData } from './office-details-props';
import { ContentCommonProps, ContentType } from './_content-common';
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
    data: ProductDataMixin & { relatedSituations?: SituationPageProps[] };
    page: SingleColPageProps;
};

export type OfficeEditorialPageProps = ContentCommonProps & {
    type: ContentType.OfficeEditorialPage;
    data: ProductDataMixin;
    page: LayoutComponentProps;
};

export type OfficePageProps = ContentCommonProps & {
    type: ContentType.OfficePage;
    data: {
        title: string;
        linkedin?: string;
        officeNorgData: OptionSetSingle<{ data: OfficeDetailsData }>;
    };
    page: LayoutComponentProps;
    editorial?: OfficeEditorialPageProps;
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
