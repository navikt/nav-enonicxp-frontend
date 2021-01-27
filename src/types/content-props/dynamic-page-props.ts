import { ContentType, ContentProps } from './_content-common';

export type DynamicPageData = {
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    feedbackToggle: boolean;
};

export interface DynamicPageProps extends ContentProps {
    __typename: ContentType.DynamicPage;
}
