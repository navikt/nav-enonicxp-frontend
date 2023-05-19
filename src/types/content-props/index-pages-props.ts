import { ContentType, ContentCommonProps } from './_content-common';
import { Area } from '../areas';
import { ProcessedHtmlProps } from '../processed-html-props';
import { IndexPageProps } from '../component-props/pages/index-page';
import {
    AudienceProps,
    ColorMixin,
    LinkSelectable,
} from '../component-props/_mixins';

type CommonData = {
    audience: AudienceProps;
} & DynamicPageData;

export type FrontPageData = {
    areasRefs: AreaPageProps[];
    areasHeader: string;
} & CommonData;

export type FrontPageProps = ContentCommonProps & {
    type: ContentType.FrontPage;
    data: FrontPageData;
    page: IndexPageProps;
};

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
