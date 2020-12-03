import { ExternalLinkData } from './external-link-props';
import { InternalLinkData } from './internal-link-props';
import { ContentListData } from './content-list-props';
import { XpContentRef } from '../../utils/paths';
import { PageListData } from './page-list-props';
import { MainArticleData } from './main-article-props';
import { ErrorData } from './error-props';
import { LargeTableData } from './large-table-props';
import { SectionPageData } from './section-page-props';
import { TransportPageData } from './transport-page-props';
import { Language } from '../../translations';
import { LayoutProps } from '../component-props/layouts';
import { MainArticleChapterData } from './main-article-chapter-props';
import { OfficeInformationData } from './office-information-props';

export enum ContentType {
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
    OfficeInformation = 'no_nav_navno_OfficeInformation',
    PublishingCalendar = 'no_nav_navno_PublishingCalendar',
}

export const contentTypeIsImplemented = (type: ContentType) =>
    Object.values(ContentType).includes(type);

export type ContentProps = {
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
    children?: ContentProps[];
    parent?: ContentProps;
    data?: ContentData;
    page?: LayoutProps;
};

type TypeSpecificData = ContentListData &
    ErrorData &
    ExternalLinkData &
    InternalLinkData &
    LargeTableData &
    MainArticleData &
    MainArticleChapterData &
    OfficeInformationData &
    PageListData &
    SectionPageData &
    TransportPageData;

export type ContentData = Partial<
    {
        canonicalUrl: string;
        metaDescription: string;
    } & TypeSpecificData
>;
