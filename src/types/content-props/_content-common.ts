import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { ContentListProps } from './content-list-props';
import { PageListProps } from './page-list-props';
import { MainArticleProps } from './main-article-props';
import { ErrorProps } from './error-props';
import { LargeTableProps } from './large-table-props';
import { SectionPageProps } from './section-page-props';
import { TransportPageProps } from './transport-page-props';
import { Language } from 'translations';
import { LayoutProps } from '../component-props/layouts';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { OfficeInformationProps } from './office-information-props';
import { UrlProps } from './url-props';
import {
    DynamicPageProps,
    GenericPageProps,
    GuidePageProps,
    OfficeBranchPageProps,
    OfficeEditorialPageProps,
    CurrentTopicPageProps,
    ProductDetailsProps,
    ProductPageProps,
    SituationPageProps,
    ThemedArticlePageProps,
    ToolsPageProps,
    PressLandingPageProps,
} from './dynamic-page-props';
import {
    PublishingCalendarProps,
    PublishingCalendarEntryProps,
} from './publishing-calendar-props';
import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { AnimatedIconsProps } from './animated-icons';
import {
    GlobalCaseTimeSetProps,
    GlobalValuesProps,
} from './global-values-props';
import { ContactInformationProps } from './contact-information-props';
import { MediaType } from '../media';
import { PayoutDatesProps } from './payout-dates';
import { LanguageProps, LayerLocale } from '../language';
import { FragmentPageProps } from './fragment-page-props';
import {
    AreaPageProps,
    FrontPageNestedProps,
    FrontPageProps,
} from './index-pages-props';
import { AudienceProps } from '../component-props/_mixins';
import { TemplateProps } from 'types/content-props/template-props';
import { SiteProps } from 'types/content-props/site-props';
import { FormDetailsPageProps } from './form-details';
import { FormIntermediateStepPageProps } from './form-intermediate-step';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { OverviewPageProps } from 'types/content-props/overview-props';

export enum ContentType {
    Error = 'error',
    Site = 'portal:site',
    Fragment = 'portal:fragment',
    TemplatePage = 'portal:page-template',
    InternalLink = 'no.nav.navno:internal-link',
    ExternalLink = 'no.nav.navno:external-link',
    Url = 'no.nav.navno:url',
    SectionPage = 'no.nav.navno:section-page',
    TransportPage = 'no.nav.navno:transport-page',
    DynamicPage = 'no.nav.navno:dynamic-page',
    ContentList = 'no.nav.navno:content-list',
    ContactInformationPage = 'no.nav.navno:contact-information',
    GenericPage = 'no.nav.navno:generic-page',
    PageList = 'no.nav.navno:page-list',
    MainArticle = 'no.nav.navno:main-article',
    MainArticleChapter = 'no.nav.navno:main-article-chapter',
    Melding = 'no.nav.navno:melding',
    LargeTable = 'no.nav.navno:large-table',
    OfficeInformation = 'no.nav.navno:office-information',
    PublishingCalendar = 'no.nav.navno:publishing-calendar',
    PublishingCalendarEntry = 'no.nav.navno:publishing-calendar-entry',
    GlobalNumberValuesSet = 'no.nav.navno:global-value-set',
    ProductPage = 'no.nav.navno:content-page-with-sidemenus',
    ProductDetails = 'no.nav.navno:product-details',
    OfficeEditorialPage = 'no.nav.navno:office-editorial-page',
    OfficeBranchPage = 'no.nav.navno:office-branch',
    GuidePage = 'no.nav.navno:guide-page',
    ThemedArticlePage = 'no.nav.navno:themed-article-page',
    CurrentTopicPage = 'no.nav.navno:current-topic-page',
    SituationPage = 'no.nav.navno:situation-page',
    AnimatedIcons = 'no.nav.navno:animated-icons',
    ToolsPage = 'no.nav.navno:tools-page',
    Calculator = 'no.nav.navno:calculator',
    Overview = 'no.nav.navno:overview',
    GlobalCaseTimeSet = 'no.nav.navno:global-case-time-set',
    PayoutDates = 'no.nav.navno:payout-dates',
    FrontPage = 'no.nav.navno:front-page',
    FrontPageNested = 'no.nav.navno:front-page-nested',
    AreaPage = 'no.nav.navno:area-page',
    PressLandingPage = 'no.nav.navno:press-landing-page',
    FormIntermediateStepPage = 'no.nav.navno:form-intermediate-step',
    FormDetails = 'no.nav.navno:form-details',
    FormsOverview = 'no.nav.navno:forms-overview',
    Video = 'no.nav.navno:video',
}

export type ContentAndMediaCommonProps = {
    type: ContentType | MediaType;
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
    layerLocale?: string;
    isPagePreview?: boolean;
};

type ContentCommonData = Partial<{
    feedbackToggle: boolean;
    chatbotToggle: boolean;
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    ingress: string;
    title: string;
    description: string;
    audience: AudienceProps;
}>;

// These fields are returned only when using the version selector
type VersionSelectorProps = {
    liveId?: string;
    liveLocale?: string;
};

export type ContentCommonProps<Type extends ContentType = ContentType> = {
    type: Type;
    data: ContentCommonData;
    originalType?: ContentType;
    children?: ContentCommonProps[];
    parent?: ContentCommonProps;
    page?: LayoutProps;
    editorView?: 'inline' | 'preview' | 'edit' | 'archive';
    breadcrumbs?: DecoratorParams['breadcrumbs'];
    isFailover?: boolean;
    languages?: LanguageProps[];
    contentLayer?: string;
    redirectToLayer?: LayerLocale;
} & ContentAndMediaCommonProps &
    VersionSelectorProps;

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
    | OfficeEditorialPageProps
    | OfficeBranchPageProps
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
    | FrontPageNestedProps
    | AreaPageProps
    | GenericPageProps
    | PressLandingPageProps
    | FormDetailsPageProps
    | FormIntermediateStepPageProps
    | FormsOverviewProps;

export type ContentProps<Type extends ContentType = ContentType> =
    ContentCommonProps<Type> & SpecificContentProps;
