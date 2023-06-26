import {
    ContentCommonProps,
    ContentType,
} from 'types/content-props/_content-common';
import { EmptyObject, OptionSetSingle } from 'types/util-types';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { TwoColsPageProps } from 'types/component-props/pages/two-cols-page';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';
import { ProviderAudience } from 'types/component-props/_mixins';

export type FormDetailsListItemProps = {
    title: string;
    sortTitle: string;
    ingress: string;
    keywords: string[];
    url?: string;
    type: ContentType;
    anchorId: string;
    illustration: AnimatedIconsProps;
    area: Area[];
    taxonomy: ProductTaxonomy[];
    formDetailsPaths: string[];
    formDetailsTitles: string[];
    formNumbers: string[];
};

export type FormsOverviewAudienceOptions = OptionSetSingle<{
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

export type FormsOverviewData = {
    title: string;
    underTitle: string;
    ingress: string;
    overviewType: 'application' | 'complaint' | 'addendum';
    illustration: AnimatedIconsProps;
    audience: FormsOverviewAudienceOptions;
    areasFilterToggle: boolean;
    taxonomyFilterToggle: boolean;
    textFilterToggle: boolean;
    formDetailsList: FormDetailsListItemProps[];
};

export type FormsOverviewProps = ContentCommonProps & {
    type: ContentType.FormsOverview;
    data: FormsOverviewData;
    page: TwoColsPageProps;
};
