import { DynamicPageData } from './dynamic-page-props';
import { ContentType, CustomContentCommonProps } from './_content-common';
import { Area } from '../areas';

export type AreaPageData = {
    area: Area;
} & DynamicPageData;

export interface AreaPageProps extends CustomContentCommonProps {
    __typename: ContentType.AreaPage;
    data: AreaPageData;
}
