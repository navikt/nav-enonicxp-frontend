import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { ContentListProps } from './content-list-props';
import { XpContentRef } from '../../utils/paths';
import { LegacyData, LegacyProps } from './legacy-props';
import { PageListData, PageListProps } from './page-list-props';
import { MainArticleProps } from './main-article-props';
import { SiteProps } from './site-props';
import { ErrorProps } from './error-props';
import { NotificationProps } from './notification-props';
import { LargeTableProps } from './large-table-props';
import { SectionPageData, SectionPageProps } from './section-page-props';
import { TransportPageData, TransportPageProps } from './transport-page-props';
import { Language } from '../../translations';
import { LayoutComponentProps } from '../component-props/layouts';

export enum ContentType {
    Legacy = 'legacy',
    Error = 'error',
    Site = 'portal_Site',
    Fragment = 'portal_Fragment',
    TemplatePage = 'portal_PageTemplate',
    InternalLink = 'no_nav_navno_InternalLink',
    ExternalLink = 'no_nav_navno_ExternalLink',
    SectionPage = 'no_nav_navno_SectionPage',
    TransportPage = 'no_nav_navno_TransportPage',
    DynamicPage = 'no_nav_navno_DynamicPage',
    ContentList = 'no_nav_navno_ContentList',
    PageList = 'no_nav_navno_PageList',
    MainArticle = 'no_nav_navno_MainArticle',
    MainArticleChapter = 'no_nav_navno_MainArticleChapter',
    Notification = 'no_nav_navno_Notification',
    LargeTable = 'no_nav_navno_LargeTable',
}

export type ContentTypeProps =
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
    | NotificationProps
    | LargeTableProps;

export type GlobalContentProps = {
    __typename: ContentType;
    _id: XpContentRef;
    _path: XpContentRef;
    createdTime: string;
    modifiedTime: string;
    language: Language;
    displayName: string;
};

export interface GlobalPageProps extends GlobalContentProps {
    page?: LayoutComponentProps;
    data: PageData;
}

export type PageData = {
    canonicalUrl?: string;
    metaDescription?: string;
} & SectionPageData &
    PageListData &
    LegacyData &
    TransportPageData;
