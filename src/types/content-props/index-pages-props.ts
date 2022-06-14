import { DynamicPageData } from './dynamic-page-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { Area } from '../areas';

type CommonData = {
    areasRefs: AreaPageProps[];
} & DynamicPageData;

export type FrontPageData = {
    areasHeader: string;
} & CommonData;

export interface FrontPageProps extends ContentCommonProps {
    __typename: ContentType.FrontPage;
    data: FrontPageData;
}

export type AreaPageData = {
    area: Area;
    header: string;
} & CommonData;

export interface AreaPageProps extends ContentCommonProps {
    __typename: ContentType.AreaPage;
    data: AreaPageData;
}
