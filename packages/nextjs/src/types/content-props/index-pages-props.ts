import { Area } from 'types/areas';
import { IndexPageProps } from 'types/component-props/pages/index-page';
import { AudienceOptions } from 'types/component-props/_mixins';
import { ContentType, ContentCommonProps } from './_content-common';
import { SituationPageProps } from './dynamic-page-props';
import { PictogramsProps } from './pictograms';
import { OverviewPageProps } from './overview-props';
import { FormsOverviewProps } from './forms-overview';
import { ExternalLinkProps } from './external-link-props';

type CommonData = {
    audience: AudienceOptions;
};

export type NavigationRefs =
    | AreaPageProps
    | FrontPageNestedProps
    | SituationPageProps
    | OtherRefsProps;

export type FrontPageData = {
    navigationRefs: NavigationRefs[];
    areasHeader: string;
} & CommonData;

export type FrontPageNestedData = {
    areasHeader: string;
    illustration: PictogramsProps;
} & CommonData;

export type FrontPageProps = {
    type: ContentType.FrontPage;
    data: FrontPageData;
};

export type FrontPageNestedProps = ContentCommonProps & {
    type: ContentType.FrontPageNested;
    data: FrontPageNestedData;
    page: IndexPageProps;
};

export type OtherRefsProps = OverviewPageProps | FormsOverviewProps | ExternalLinkProps;

export type AreaPageData = {
    area: Area;
    header: string;
};

export type AreaPageProps = Pick<ContentCommonProps, '_id' | '_path'> & {
    type: ContentType.AreaPage;
    data: AreaPageData;
};
