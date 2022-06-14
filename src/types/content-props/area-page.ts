import { DynamicPageData } from './dynamic-page-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { Area } from '../areas';

export type AreaPageData = {
    area: Area;
} & DynamicPageData;

export interface AreaPageProps extends ContentCommonProps {
    __typename: ContentType.AreaPage;
    data: AreaPageData;
}
