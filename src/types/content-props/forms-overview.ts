import {
    ContentCommonProps,
    ContentType,
} from 'types/content-props/_content-common';
import { OptionSetSingle } from 'types/util-types';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';

export type FormsOverviewFormDetailsList = {};

export type FormsOverviewData = {
    title: string;
    ingress: string;
    audience: OptionSetSingle<{
        privatperson: {};
        arbeidsgiver: {};
        samarbeidspartner: {}; // TODO: add sub-categories
    }>;
    illustration: AnimatedIconsProps;
    showFilter: boolean;
    formDetailsList: FormsOverviewFormDetailsList;
};

export type FormsOverviewProps = ContentCommonProps & {
    type: ContentType.FormsOverview;
    data: FormsOverviewData;
};
