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

export enum ContentType {
    Legacy = 'legacy',
    Error = 'error',
    Site = 'portal_Site',
    InternalLink = 'no_nav_navno_InternalLink',
    ExternalLink = 'no_nav_navno_ExternalLink',
    SectionPage = 'no_nav_navno_SectionPage',
    TransportPage = 'no_nav_navno_TransportPage',
    ContentList = 'no_nav_navno_ContentList',
    PageList = 'no_nav_navno_PageList',
    MainArticle = 'no_nav_navno_MainArticle',
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
    | MainArticleProps;

export type GlobalSchema = {
    __typename: ContentType;
    _id: EnonicContentRef;
    _path: EnonicContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    data: object;
    didRedirect?: boolean;
};
