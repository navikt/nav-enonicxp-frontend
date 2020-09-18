import { PortalSiteSchema } from './portal-site-schema';
import { ExternalLinkSchema } from './external-link-schema';
import { InternalLinkSchema } from './internal-link-schema';
import { SectionPageSchema } from './section-page-schema';
import { TransportPageSchema } from './transport-page-schema';
import { ContentListSchema } from './content-list-schema';
import { PageListSchema } from './page-list-schema';
import { MainArticleSchema } from './main-article-schema';
import { EnonicContentRef } from '../../utils/enonic-path';
import { NotImplementedSchema } from './not-implemented-schema';

export enum ContentType {
    NotImplemented,
    Site = 'portal:site',
    InternalLink = 'no.nav.navno:internal-link',
    ExternalLink = 'no.nav.navno:external-link',
    SectionPage = 'no.nav.navno:section-page',
    TransportPage = 'no.nav.navno:transport-page',
    ContentList = 'no.nav.navno:content-list',
    PageList = 'no.nav.navno:page-list',
    MainArticle = 'no.nav.navno:main-article',
}

export type ContentTypeSchemas =
    | NotImplementedSchema
    | PortalSiteSchema
    | ExternalLinkSchema
    | InternalLinkSchema
    | SectionPageSchema
    | TransportPageSchema
    | ContentListSchema
    | PageListSchema
    | MainArticleSchema;

export type GlobalSchema = {
    _id: EnonicContentRef;
    _path: EnonicContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    type: ContentType;
    data: object;
};
