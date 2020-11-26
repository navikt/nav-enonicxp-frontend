import { ContentType, ContentProps } from './_content-common';

export interface SiteProps extends ContentProps {
    __typename: ContentType.Site;
}
