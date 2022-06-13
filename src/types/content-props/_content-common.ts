import { ExternalLinkData, ExternalLinkProps } from './external-link-props';
import { InternalLinkData, InternalLinkProps } from './internal-link-props';
import { ContentListData, ContentListProps } from './content-list-props';
import { PageListData, PageListProps } from './page-list-props';
import { MainArticleData, MainArticleProps } from './main-article-props';
import { ErrorData, ErrorProps } from './error-props';
import { LargeTableData, LargeTableProps } from './large-table-props';
import { SectionPageData, SectionPageProps } from './section-page-props';
import { TransportPageData, TransportPageProps } from './transport-page-props';
import { Language } from '../../translations';
import { LayoutProps } from '../component-props/layouts';
import {
    MainArticleChapterData,
    MainArticleChapterProps,
} from './main-article-chapter-props';
import {
    OfficeInformationData,
    OfficeInformationProps,
} from './office-information-props';
import { UrlData, UrlProps } from './url-props';
import {
    DynamicPageData,
    DynamicPageProps,
    GuidePageProps,
    OverviewPageData,
    OverviewPageProps,
    ProductDetailsData,
    ProductDetailsProps,
    ProductPageData,
    ProductPageProps,
    SituationPageData,
    SituationPageProps,
    ThemedArticlePageProps,
    ToolsPageProps,
} from './dynamic-page-props';
import {
    PublishingCalendarData,
    PublishingCalendarProps,
} from './publishing-calendar-props';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { AnimatedIconsData, AnimatedIconsProps } from './animated-icons';
import {
    GlobalCaseTimeSetData,
    GlobalCaseTimeSetProps,
    GlobalValuesData,
    GlobalValuesProps,
} from './global-values-props';
import {
    ContactInformationData,
    ContactInformationProps,
} from './contact-information-props';
import { MediaType } from '../media';
import { PayoutDatesData, PayoutDatesProps } from './payout-dates';
import { FrontPageData, FrontPageProps } from './front-page';
import { AreaPageData, AreaPageProps } from './area-page';
import { LanguageProps } from '../language';
import { FragmentPageProps } from './fragment-page-props';

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
    GenericPage = 'no_nav_navno_GenericPage',
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
    PayoutDates = 'no_nav_navno_PayoutDates',
    FrontPage = 'no_nav_navno_FrontPage',
    AreaPage = 'no_nav_navno_AreaPage',
}

export type ContentCommonProps = {
    __typename: ContentType | MediaType;
    _id: string;
    _path: string;
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

export type ContentDataCommon = Partial<{
    feedbackToggle: boolean;
    chatbotToggle: boolean;
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    customPath: string;
    ingress: string;
    description: string;
    languages: LanguageProps[];
}>;

type ContentData =
    | ContentListData
    | ErrorData
    | ContactInformationData
    | ExternalLinkData
    | InternalLinkData
    | UrlData
    | LargeTableData
    | MainArticleData
    | MainArticleChapterData
    | OfficeInformationData
    | PageListData
    | SectionPageData
    | TransportPageData
    | DynamicPageData
    | PublishingCalendarData
    | ProductPageData
    | SituationPageData
    | AnimatedIconsData
    | GlobalValuesData
    | GlobalCaseTimeSetData
    | PayoutDatesData
    | FrontPageData
    | AreaPageData
    | OverviewPageData
    | ProductDetailsData;

export type PathMap = { [key: string]: string };

export type CustomContentCommonProps = {
    __typename: ContentType;
    children?: CustomContentCommonProps[];
    parent?: CustomContentCommonProps;
    data?: ContentDataCommon & ContentData;
    page?: LayoutProps;
    editorView?: 'inline' | 'preview' | 'edit';
    breadcrumbs?: DecoratorParams['breadcrumbs'];
    pathMap?: PathMap;
    livePath?: string;
    versionTimestamps?: string[];
    isFailover?: boolean;
    isPagePreview?: boolean;
} & ContentCommonProps;

export type CustomContentProps = CustomContentCommonProps &
    (
        | ContentListProps
        | ErrorProps
        | ExternalLinkProps
        | InternalLinkProps
        | UrlProps
        | LargeTableProps
        | MainArticleProps
        | MainArticleChapterProps
        | OfficeInformationProps
        | PageListProps
        | SectionPageProps
        | TransportPageProps
        | PublishingCalendarProps
        | ProductPageProps
        | SituationPageProps
        | AnimatedIconsProps
        | GlobalValuesProps
        | GlobalCaseTimeSetProps
        | PayoutDatesProps
        | FrontPageProps
        | AreaPageProps
        | ThemedArticlePageProps
        | GuidePageProps
        | ToolsPageProps
        | DynamicPageProps
        | OverviewPageProps
        | ProductDetailsProps
        | FragmentPageProps
        | ContactInformationProps
    );
