import { ContentType, GlobalSchema } from './_schema';

export interface SiteProps extends GlobalSchema {
    __typename: ContentType.Site;
}
