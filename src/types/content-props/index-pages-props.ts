import { DynamicPageData } from './dynamic-page-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { Area } from '../areas';
import { ProcessedHtmlProps } from '../processed-html-props';
import { IndexPageProps } from '../component-props/pages/index-page';
import {
    Audience,
    ColorMixin,
    LinkSelectable,
} from '../component-props/_mixins';

type CommonData = {
    audience: Audience;
} & DynamicPageData;

export type FrontPageData = {
    areasRefs: AreaPageProps[];
    areasHeader: string;
} & CommonData;

export interface FrontPageProps extends ContentCommonProps {
    type: ContentType.FrontPage;
    data: FrontPageData;
    page: IndexPageProps;
}

export type AreaPageData = {
    area: Area;
    header: string;
    banner: { link: LinkSelectable; html: ProcessedHtmlProps } & ColorMixin;
} & CommonData;

export interface AreaPageProps extends ContentCommonProps {
    type: ContentType.AreaPage;
    data: AreaPageData;
    page: IndexPageProps;
}
