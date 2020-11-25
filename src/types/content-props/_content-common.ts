import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { ContentListData, ContentListProps } from './content-list-props';
import { XpContentRef } from '../../utils/paths';
import { LegacyData, LegacyProps } from './legacy-props';
import { PageListData, PageListProps } from './page-list-props';
import { MainArticleData, MainArticleProps } from './main-article-props';
import { SiteProps } from './site-props';
import { ErrorData, ErrorProps } from './error-props';
import { NotificationProps } from './notification-props';
import { LargeTableProps } from './large-table-props';
import { SectionPageData, SectionPageProps } from './section-page-props';
import { TransportPageData, TransportPageProps } from './transport-page-props';
import { Language } from '../../translations';
import { LayoutProps } from '../component-props/layouts';
import {
    MainArticleChapterData,
    MainArticleChapterProps,
} from './main-article-chapter-props';
import { TemplateProps } from './template-props';
import { DynamicPageProps } from './dynamic-page-props';

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

export const contentTypeIsImplemented = (type: ContentType) =>
    Object.values(ContentType).includes(type);

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
    | MainArticleChapterProps
    | NotificationProps
    | LargeTableProps
    | TemplateProps
    | DynamicPageProps;

export type GlobalContentProps = {
    __typename: ContentType;
    _id: XpContentRef;
    _path: XpContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    language: Language;
    publish?: {
        first?: string;
        from?: string;
    };
    data?: PageData;
    page?: LayoutProps;
    children?: GlobalContentProps[];
    parent?: GlobalContentProps;
};

export type PageData = {
    canonicalUrl?: string;
    metaDescription?: string;
} & SectionPageData &
    PageListData &
    LegacyData &
    TransportPageData &
    MainArticleData &
    MainArticleChapterData &
    ErrorData &
    ContentListData;
