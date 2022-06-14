import { ContentType, ContentCommonProps } from './_content-common';

export interface SiteProps extends ContentCommonProps {
    __typename: ContentType.Site;
}
