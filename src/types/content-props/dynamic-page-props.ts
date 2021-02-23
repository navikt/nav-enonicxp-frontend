import { ContentType, ContentProps, SeoDataProps } from './_content-common';

export type DynamicPageData = Partial<{
    feedbackToggle: boolean;
}> &
    SeoDataProps;

export interface DynamicPageProps extends ContentProps {
    __typename: ContentType.DynamicPage;
    data: DynamicPageData;
}
