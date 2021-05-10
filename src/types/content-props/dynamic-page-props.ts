import { ContentType, ContentProps, SeoDataProps } from './_content-common';
import { LanguageProps } from '../language';

export type DynamicPageData = Partial<{
    feedbackToggle: boolean;
    languages: LanguageProps[];
    description: string;
}> &
    SeoDataProps;

export interface DynamicPageProps extends ContentProps {
    __typename: ContentType.DynamicPage;
    data: DynamicPageData;
}
