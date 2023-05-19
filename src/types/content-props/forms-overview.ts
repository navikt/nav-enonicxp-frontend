import {
    ContentCommonProps,
    ContentType,
} from 'types/content-props/_content-common';
import { EmptyObject, OptionSetSingle } from 'types/util-types';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { TwoColsPageProps } from 'types/component-props/pages/two-cols-page';
import { Area } from 'types/areas';
import { ProductTaxonomy } from 'types/taxonomies';

export type FormDetailsListItemProps = {
    title: string;
    anchorId: string;
    illustration: AnimatedIconsProps;
    area: Area[];
    taxonomy: ProductTaxonomy[];
    formDetailsPaths: string[];
};

type AudienceOptions = {
    person: EmptyObject;
    employer: EmptyObject;
    provider: {
        pageType: OptionSetSingle<{
            formDetails: {
                provider_audience: ''; // TODO: add type
            };
            audienceLinks: {
                providerAudienceLinks: {
                    link: {
                        _path: string;
                        title: string;
                    };
                };
            };
        }>;
    };
};

export type FormsOverviewData = {
    title: string;
    ingress: string;
    overviewType: 'application' | 'complaint' | 'addendum';
    illustration: AnimatedIconsProps;
    audience: OptionSetSingle<AudienceOptions>;
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
