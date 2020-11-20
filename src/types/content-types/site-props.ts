import { ContentType, GlobalContentSchema } from './_schema';

export interface SiteProps extends GlobalContentSchema {
    __typename: ContentType.Site;
}
