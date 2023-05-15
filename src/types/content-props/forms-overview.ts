import {
    ContentCommonProps,
    ContentType,
} from 'types/content-props/_content-common';
import { OptionSetSingle } from 'types/util-types';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { TwoColsPageProps } from 'types/component-props/pages/two-cols-page';
import { Area } from 'types/areas';
import { Taxonomy } from 'types/taxonomies';

export type FormDetailsListItem = {
    title: string;
    anchorId: string;
    illustration: AnimatedIconsProps;
    area: Area[];
    taxonomy: Taxonomy[];
    formDetailsPaths: string[];
};

type AudienceOptions = {
    person: {};
    employer: {};
    provider: {}; // TODO: add sub-categories
};

export type FormsOverviewData = {
    title: string;
    ingress: string;
    audience: OptionSetSingle<AudienceOptions>;
    illustration: AnimatedIconsProps;
    showFilter: boolean;
    formDetailsList: FormDetailsListItem[];
};

export type FormsOverviewProps = ContentCommonProps & {
    type: ContentType.FormsOverview;
    data: FormsOverviewData;
    page: TwoColsPageProps;
};
