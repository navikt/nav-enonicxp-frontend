import { ContentCommonProps, ContentType } from 'types/content-props/_content-common';
import { ProductDataMixin, ProviderAudience } from 'types/component-props/_mixins';
import { PictogramsProps } from 'types/content-props/pictograms';
import { ProductTaxonomy } from 'types/taxonomies';
import { Area } from 'types/areas';
import { EmptyObject, OptionSetSingle } from 'types/util-types';
import { SingleColPageProps } from 'types/component-props/pages/single-col-page';

type ContentTypeInOversiktPages =
    | ContentType.ProductPage
    | ContentType.ThemedArticlePage
    | ContentType.GuidePage;

export type OversiktPageProductLink = {
    url: string;
    type: ContentTypeInOversiktPages;
    language: string;
    title: string;
};

export type OversiktAudienceOptions = OptionSetSingle<{
    person: EmptyObject;
    employer: EmptyObject;
    provider: {
        pageType: OptionSetSingle<{
            overview: {
                provider_audience: ProviderAudience[];
            };
            links: {
                links: Array<{
                    text?: string;
                    link: {
                        _path: string;
                        data: {
                            title: string;
                        };
                    };
                }>;
            };
        }>;
    };
}>;

export type OversiktSubItem = {
    path: string;
    title: string;
    ingress: string;
    type: ContentTypeInOversiktPages;
    formNumbers: string[];
};

export type OversiktItemListItem = {
    title: string;
    sortTitle: string;
    ingress: string;
    keywords: string[];
    url: string;
    type: ContentTypeInOversiktPages;
    targetLanguage: string;
    anchorId: string;
    illustration: PictogramsProps;
    area: Area[];
    taxonomy: ProductTaxonomy[];
    subItems: OversiktSubItem[];
};

export type OversiktPageData = {
    title: string;
    underTitle: string;
    ingress: string;
    oversiktType:
        | 'application'
        | 'complaint'
        | 'addendum'
        | 'rates'
        | 'payout_dates'
        | 'processing_times'
        | 'all_products';
    illustration: PictogramsProps;
    audience: OversiktAudienceOptions[];
    areasFilterToggle: boolean;
    textFilterToggle: boolean;
    itemList: OversiktItemListItem[];
} & ProductDataMixin;

export type OversiktPageProps = ContentCommonProps & {
    type: ContentType.Oversikt;
    data: OversiktPageData;
    page: SingleColPageProps;
};
