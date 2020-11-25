import { ContentType, GlobalContentProps } from './_content-common';

export interface DynamicPageProps extends GlobalContentProps {
    __typename: ContentType.DynamicPage;
}
