import { Area } from 'types/areas';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { IndexPageProps } from 'types/component-props/pages/index-page';
import { AudienceOptions, ColorMixin, LinkSelectable } from 'types/component-props/_mixins';
import { ContentType, ContentCommonProps } from './_content-common';
import { SituationPageProps } from './dynamic-page-props';
import { AnimatedIconsProps } from './animated-icons';
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
    illustration: AnimatedIconsProps;
} & CommonData;

export type FrontPageProps = ContentCommonProps & {
    type: ContentType.FrontPage;
    data: FrontPageData;
    page: IndexPageProps;
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
    banner: { link: LinkSelectable; html: ProcessedHtmlProps } & ColorMixin;
} & CommonData;

export type AreaPageProps = ContentCommonProps & {
    type: ContentType.AreaPage;
    data: AreaPageData;
    page: IndexPageProps;
};
