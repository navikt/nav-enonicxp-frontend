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
    OverviewPageProps,
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

export enum ContentType {
    Error = 'error',
    Site = 'portal:site',
    Fragment = 'portal:fragment',
    TemplatePage = 'portal:page-template',
    AnimatedIcons = 'no.nav.navno:animated-icons',
    AreaPage = 'no.nav.navno:area-page',
    Calculator = 'no.nav.navno:calculator',
    ContactInformationPage = 'no.nav.navno:contact-information',
    ContentList = 'no.nav.navno:content-list',
    CurrentTopicPage = 'no.nav.navno:current-topic-page',
    CurrentTopicPageV2 = 'no.nav.navno:current-topic-page-v2',
    DynamicPage = 'no.nav.navno:dynamic-page',
    ExternalLink = 'no.nav.navno:external-link',
    FormDetails = 'no.nav.navno:form-details',
    FormIntermediateStepPage = 'no.nav.navno:form-intermediate-step',
    FormsOverview = 'no.nav.navno:forms-overview',
    FrontPage = 'no.nav.navno:front-page',
    FrontPageNested = 'no.nav.navno:front-page-nested',
    GenericPage = 'no.nav.navno:generic-page',
    GenericPageV2 = 'no.nav.navno:generic-page-v2',
    GlobalCaseTimeSet = 'no.nav.navno:global-case-time-set',
    GlobalNumberValuesSet = 'no.nav.navno:global-value-set',
    GuidePage = 'no.nav.navno:guide-page',
    GuidePageV2 = 'no.nav.navno:guide-page-v2',
    InternalLink = 'no.nav.navno:internal-link',
    LargeTable = 'no.nav.navno:large-table',
    MainArticle = 'no.nav.navno:main-article',
    MainArticleChapter = 'no.nav.navno:main-article-chapter',
    Melding = 'no.nav.navno:melding',
    OfficeBranchPage = 'no.nav.navno:office-branch',
    OfficeEditorialPage = 'no.nav.navno:office-editorial-page',
    OfficeInformation = 'no.nav.navno:office-information',
    Overview = 'no.nav.navno:overview',
    PageList = 'no.nav.navno:page-list',
    PageMeta = 'no.nav.navno:page-meta',
    PayoutDates = 'no.nav.navno:payout-dates',
    PressLandingPage = 'no.nav.navno:press-landing-page',
    ProductDetails = 'no.nav.navno:product-details',
    ProductPage = 'no.nav.navno:content-page-with-sidemenus',
    ProductPageV2 = 'no.nav.navno:product-page-v2',
    PublishingCalendar = 'no.nav.navno:publishing-calendar',
    PublishingCalendarEntry = 'no.nav.navno:publishing-calendar-entry',
    SectionPage = 'no.nav.navno:section-page',
    SituationPage = 'no.nav.navno:situation-page',
    SituationPageV2 = 'no.nav.navno:situation-page-v2',
    ThemedArticlePage = 'no.nav.navno:themed-article-page',
    ThemedArticlePageV2 = 'no.nav.navno:themed-article-page-v2',
    ToolsPage = 'no.nav.navno:tools-page',
    ToolsPageV2 = 'no.nav.navno:tools-page-v2',
    TransportPage = 'no.nav.navno:transport-page',
    Url = 'no.nav.navno:url',
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
