import { ContentType, GlobalSchema } from './_schemas';

export interface PortalSiteSchema extends GlobalSchema {
    type: ContentType.Site;
}
