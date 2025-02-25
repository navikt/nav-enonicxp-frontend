import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { LayoutComponentProps } from 'types/component-props/layouts';
import { Audience, ProductDataMixin } from 'types/component-props/_mixins';
import { ProductDetailType as OverviewType } from 'types/content-props/product-details';
import { PictogramsProps } from 'types/content-props/pictograms';
import { ProductTaxonomy } from 'types/taxonomies';
import { Area } from 'types/areas';

type ContentTypeInOverviewPages =
    | ContentType.ProductPage
    | ContentType.ThemedArticlePage
    | ContentType.GuidePage;

export type OverviewPageProductLink = {
    url: string;
    type: ContentTypeInOverviewPages;
    language: string;
    title: string;
};

export type OverviewPageProductItem = {
    anchorId: string;
    area: Area[];
    audience: Audience;
    illustration: PictogramsProps;
    ingress: string;
    productDetailsPath?: string;
    productLinks: OverviewPageProductLink[];
    taxonomy: ProductTaxonomy[];
    title: string;
    keywords?: string[];
};

export type OverviewPageData = {
    productList: OverviewPageProductItem[];
    overviewType: OverviewType;
} & ProductDataMixin;

export type OverviewPageProps = ContentCommonProps & {
    type: ContentType.Overview;
    data: OverviewPageData;
    page: LayoutComponentProps;
};
