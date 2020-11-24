import { ContentType, GlobalContentProps } from './_content-common';

export interface SiteProps extends GlobalContentProps {
    __typename: ContentType.Site;
}
