import { ExternalLinkData } from './external-link-props';
import { InternalLinkData } from './internal-link-props';
import { ContentListData } from './content-list-props';
import { XpContentRef } from '../../utils/urls';
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
import { UrlData } from './url-props';
import {
    DynamicPageData,
    ProductPageData,
    SituationPageData,
} from './dynamic-page-props';
import { PublishingCalendarData } from './publishing-calendar-props';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { AnimatedIconsData } from './animated-icons';
import { GlobalCaseTimeSetData, GlobalValuesData } from './global-values-props';
import { ContactInformationData } from './contact-information-props';
import { MediaType } from '../media';

export enum ContentType {
    Error = 'error',
    Site = 'portal_Site',
    Fragment = 'portal_Fragment',
    TemplatePage = 'portal_PageTemplate',
    InternalLink = 'no_nav_navno_InternalLink',
    ExternalLink = 'no_nav_navno_ExternalLink',
    Url = 'no_nav_navno_Url',
    SectionPage = 'no_nav_navno_SectionPage',
    TransportPage = 'no_nav_navno_TransportPage',
    DynamicPage = 'no_nav_navno_DynamicPage',
    ContentList = 'no_nav_navno_ContentList',
    ContactInformationPage = 'no_nav_navno_ContactInformation',
    PageList = 'no_nav_navno_PageList',
    MainArticle = 'no_nav_navno_MainArticle',
    MainArticleChapter = 'no_nav_navno_MainArticleChapter',
    Melding = 'no_nav_navno_Melding',
    LargeTable = 'no_nav_navno_LargeTable',
    OfficeInformation = 'no_nav_navno_OfficeInformation',
    PublishingCalendar = 'no_nav_navno_PublishingCalendar',
    GlobalNumberValuesSet = 'no_nav_navno_GlobalValueSet',
    ProductPage = 'no_nav_navno_ContentPageWithSidemenus',
    ProductDetails = 'no_nav_navno_ProductDetails',
    GuidePage = 'no_nav_navno_GuidePage',
    ThemedArticlePage = 'no_nav_navno_ThemedArticlePage',
    SituationPage = 'no_nav_navno_SituationPage',
    AnimatedIcons = 'no_nav_navno_AnimatedIcons',
    ToolsPage = 'no_nav_navno_ToolsPage',
    Calculator = 'no_nav_navno_Calculator',
    Overview = 'no_nav_navno_Overview',
    GlobalCaseTimeSet = 'no_nav_navno_GlobalCaseTimeSet',
}

export type ContentCommonProps = {
    __typename: ContentType | MediaType;
    _id: XpContentRef;
    _path: XpContentRef;
    createdTime: string;
    modifiedTime: string;
    displayName: string;
    language: Language;
    publish?: {
        first?: string;
        from?: string;
        to?: string;
    };
    isDraft?: boolean;
    timeRequested?: string;
    serverEnv?: string;
};

export type ContentProps = {
    __typename: ContentType;
    children?: ContentProps[];
    parent?: ContentProps;
    data?: ContentData;
    page?: LayoutProps;
    editorView?: 'inline' | 'preview' | 'edit';
    breadcrumbs?: DecoratorParams['breadcrumbs'];
    pathMap?: PathMap;
    livePath?: string;
    versionTimestamps?: string[];
    isFailover?: boolean;
    isPagePreview?: boolean;
} & ContentCommonProps;

export type PathMap = { [key: string]: string };

export type SeoDataProps = Partial<{
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
}>;

export type ContentDecoratorToggles = Partial<{
    feedbackToggle: boolean;
    chatbotToggle: boolean;
}>;

export type ContentData = Partial<
    ContentListData &
        ErrorData &
        ContactInformationData &
        ExternalLinkData &
        InternalLinkData &
        UrlData &
        LargeTableData &
        MainArticleData &
        MainArticleChapterData &
        OfficeInformationData &
        PageListData &
        SectionPageData &
        TransportPageData &
        DynamicPageData &
        PublishingCalendarData &
        ProductPageData &
        SituationPageData &
        AnimatedIconsData &
        GlobalValuesData &
        GlobalCaseTimeSetData
>;
