import { ContentType, ContentProps } from './_content-common';

export interface DynamicPageProps extends ContentProps {
    __typename: ContentType.DynamicPage;
}
