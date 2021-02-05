import { ContentType, ContentProps } from './_content-common';

export type FragmentPageData = Partial<{
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    feedbackToggle: boolean;
}>;

export interface FragmentPageProps extends ContentProps {
    __typename: ContentType.Fragment;
    data: FragmentPageData;
}
