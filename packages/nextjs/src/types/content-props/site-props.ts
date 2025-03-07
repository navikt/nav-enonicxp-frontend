import { ContentType, ContentCommonProps } from './_content-common';

export type SiteProps = ContentCommonProps & {
    type: ContentType.Site;
};
