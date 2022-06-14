import { DynamicPageData } from './dynamic-page-props';
import { ContentType, ContentCommonProps } from './_content-common';
import { AreaPageProps } from './area-page';

export type FrontPageData = {
    areasHeader: string;
    areas: AreaPageProps[];
} & DynamicPageData;

export interface FrontPageProps extends ContentCommonProps {
    __typename: ContentType.FrontPage;
    data: FrontPageData;
}
