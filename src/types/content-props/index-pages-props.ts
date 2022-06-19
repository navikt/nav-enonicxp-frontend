import { DynamicPageData } from './dynamic-page-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { Area } from '../areas';
import { ProcessedHtmlProps } from '../processed-html-props';
import { IndexPageProps } from '../component-props/pages/index-page';
import { Audience } from '../component-props/_mixins';

type CommonData = {
    areasRefs: AreaPageProps[];
    audience: Audience;
} & DynamicPageData;

export type FrontPageData = {
    areasHeader: string;
} & CommonData;

export interface FrontPageProps extends ContentCommonProps {
    __typename: ContentType.FrontPage;
    data: FrontPageData;
    page: IndexPageProps;
}

export type AreaPageData = {
    area: Area;
    header: string;
    banner: ProcessedHtmlProps;
} & CommonData;

export interface AreaPageProps extends ContentCommonProps {
    __typename: ContentType.AreaPage;
    data: AreaPageData;
    page: IndexPageProps;
}
