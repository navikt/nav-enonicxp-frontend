import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { ContentListProps } from './content-list-props';
import { PageListProps } from './page-list-props';
import { MainArticleProps } from './main-article-props';
import { ErrorProps } from './error-props';
import { LargeTableProps } from './large-table-props';
import { SectionPageProps } from './section-page-props';
import { TransportPageProps } from './transport-page-props';
import { Language } from '../../translations';
import { LayoutProps } from '../component-props/layouts';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { OfficeInformationProps } from './office-information-props';
import { UrlProps } from './url-props';
import {
    DynamicPageProps,
    GenericPageProps,
    GuidePageProps,
    CurrentTopicPageProps,
    OverviewPageProps,
    ProductDetailsProps,
    ProductPageProps,
    SituationPageProps,
    ThemedArticlePageProps,
    ToolsPageProps,
} from './dynamic-page-props';
import {
    PublishingCalendarProps,
    PublishingCalendarEntryProps,
} from './publishing-calendar-props';
import { Params as DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { AnimatedIconsProps } from './animated-icons';
import {
    GlobalCaseTimeSetProps,
    GlobalValuesProps,
} from './global-values-props';
import { ContactInformationProps } from './contact-information-props';
import { MediaType } from '../media';
import { PayoutDatesProps } from './payout-dates';
import { LanguageProps } from '../language';
import { FragmentPageProps } from './fragment-page-props';
import { AreaPageProps, FrontPageProps } from './index-pages-props';
import { Audience } from '../component-props/_mixins';

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
    PublishingCalendarEntry = 'no_nav_navno_PublishingCalendarEntry',
    GlobalNumberValuesSet = 'no_nav_navno_GlobalValueSet',
    ProductPage = 'no_nav_navno_ContentPageWithSidemenus',
    ProductDetails = 'no_nav_navno_ProductDetails',
    GuidePage = 'no_nav_navno_GuidePage',
    ThemedArticlePage = 'no_nav_navno_ThemedArticlePage',
    CurrentTopicPage = 'no_nav_navno_CurrentTopicPage',
    SituationPage = 'no_nav_navno_SituationPage',
    AnimatedIcons = 'no_nav_navno_AnimatedIcons',
    ToolsPage = 'no_nav_navno_ToolsPage',
    Calculator = 'no_nav_navno_Calculator',
    Overview = 'no_nav_navno_Overview',
    GlobalCaseTimeSet = 'no_nav_navno_GlobalCaseTimeSet',
    PayoutDates = 'no_nav_navno_PayoutDates',
    FrontPage = 'no_nav_navno_FrontPage',
    AreaPage = 'no_nav_navno_AreaPage',
    PressLandingPage = 'no_nav_navno_PressLandingPage',
}

export type ContentAndMediaCommonProps = {
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

type ContentCommonData = Partial<{
    feedbackToggle: boolean;
    chatbotToggle: boolean;
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    ingress: string;
    description: string;
    languages: LanguageProps[];
    audience: Audience;
}>;

export type ContentCommonProps = {
    __typename: ContentType;
    originalType?: string;
    children?: ContentCommonProps[];
    parent?: ContentCommonProps;
    data?: ContentCommonData;
    page?: LayoutProps;
    editorView?: 'inline' | 'preview' | 'edit';
    breadcrumbs?: DecoratorParams['breadcrumbs'];
    livePath?: string;
    isFailover?: boolean;
    isPagePreview?: boolean;
} & ContentAndMediaCommonProps;

type SiteProps = {
    __typename: ContentType.Site;
} & ContentCommonProps;

type TemplateProps = {
    __typename: ContentType.TemplatePage;
    data: {
        supports?: string | string[];
    };
} & ContentCommonProps;

type SpecificContentProps =
    | SiteProps
    | TemplateProps
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
    | PublishingCalendarEntryProps
    | ProductPageProps
    | SituationPageProps
    | AnimatedIconsProps
    | GlobalValuesProps
    | GlobalCaseTimeSetProps
    | PayoutDatesProps
    | CurrentTopicPageProps
    | ThemedArticlePageProps
    | GuidePageProps
    | ToolsPageProps
    | DynamicPageProps
    | OverviewPageProps
    | ProductDetailsProps
    | FragmentPageProps
    | ContactInformationProps
    | FrontPageProps
    | AreaPageProps
    | GenericPageProps;

export type ContentProps = ContentCommonProps & SpecificContentProps;
