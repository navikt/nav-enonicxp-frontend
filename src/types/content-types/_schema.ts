import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { SectionPageProps } from './section-page-props';
import { TransportPageProps } from './transport-page-props';
import { ContentListProps } from './content-list-props';
import { EnonicContentRef } from '../../utils/paths';
import { LegacyProps } from './legacy-props';
import { PageListProps } from './page-list-props';
import { MainArticleProps } from './main-article-props';
import { SiteProps } from './site-props';
import { ErrorProps } from './error-props';
import { NotificationProps } from './notification-props';
import { DynamicRegionComponent } from './_dynamic/_components';
import { DynamicGlobalComponent } from './_dynamic/_components';

export enum ContentType {
    Legacy = 'legacy',
    Error = 'error',
    Site = 'portal_Site',
    Fragment = 'portal_Fragment',
    InternalLink = 'no_nav_navno_InternalLink',
    ExternalLink = 'no_nav_navno_ExternalLink',
    SectionPage = 'no_nav_navno_SectionPage',
    TransportPage = 'no_nav_navno_TransportPage',
    DynamicPage = 'no_nav_navno_DynamicPage',
    ContentList = 'no_nav_navno_ContentList',
    PageList = 'no_nav_navno_PageList',
    MainArticle = 'no_nav_navno_MainArticle',
    Notification = 'no_nav_navno_Notification',
}

export enum PartType {
    LinkPanel = 'no.nav.navno:dynamic-link-panel',
    SupervisorPanel = 'no.nav.navno:dynamic-supervisor-panel',
    Alert = 'no.nav.navno:dynamic-alert',
    ReadMorePanel = 'no.nav.navno:dynamic-read-more-panel',
}

export type ContentTypeSchema =
    | LegacyProps
    | ErrorProps
    | SiteProps
    | ExternalLinkProps
    | InternalLinkProps
    | SectionPageProps
    | TransportPageProps
    | ContentListProps
    | PageListProps
    | MainArticleProps
    | NotificationProps;

export type GlobalSchema = {
    __typename: ContentType;
    _id: EnonicContentRef;
    _path: EnonicContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    data: object;
    didRedirect?: boolean;
    isDraft?: boolean;
};

// Specific for dynamic page schemas
export interface GlobalPageSchema extends GlobalSchema {
    components?: DynamicGlobalComponent[];
    page?: DynamicPage;
}

export interface DynamicPage {
    type: string;
    descriptor: string;
    path: string;
    config: object;
    regions?: DynamicRegions;
}

export interface DynamicRegions {
    main?: DynamicRegion;
    first?: DynamicRegion;
    second?: DynamicRegion;
    result?: DynamicRegion;
    searchbar?: DynamicRegion;
}

export interface DynamicRegion {
    name: string;
    components: DynamicRegionComponent[];
}
