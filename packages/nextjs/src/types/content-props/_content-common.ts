import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { Language } from 'translations';
import { LayoutComponentProps } from 'types/component-props/layouts';
import { MediaType } from 'types/media';
import { LanguageProps, LayerLocale } from 'types/language';
import { AudienceOptions } from 'types/component-props/_mixins';
import { CurrentTopicPageProps } from 'components/pages/current-topic-page/CurrentTopicPage';
import { TemplateProps } from 'types/content-props/template-props';
import { SiteProps } from 'types/content-props/site-props';
import { FormsOverviewProps } from 'types/content-props/forms-overview';
import { OverviewPageProps } from 'types/content-props/overview-props';
import { ContactStepPageProps } from 'components/pages/contactStepPage/ContactStepPage';
import { FormIntermediateStepPageProps } from 'components/pages/formIntermediateStepPage/FormIntermediateStepPage';
import { ExternalLinkProps } from './external-link-props';
import { InternalLinkProps } from './internal-link-props';
import { ContentListProps } from './content-list-props';
import { PageListProps } from './page-list-props';
import { MainArticleProps } from './main-article-props';
import { ErrorProps } from './error-props';
import { LargeTableProps } from './large-table-props';
import { SectionPageProps } from './section-page-props';
import { TransportPageProps } from './transport-page-props';
import { MainArticleChapterProps } from './main-article-chapter-props';
import { OfficeInformationProps } from './office-information-props';
import { UrlProps } from './url-props';
import {
    DynamicPageProps,
    GenericPageProps,
    GuidePageProps,
    OfficeEditorialPageProps,
    ProductDetailsProps,
    ProductPageProps,
    SituationPageProps,
    ThemedArticlePageProps,
    ToolsPageProps,
    PressLandingPageProps,
    OfficePageProps,
} from './dynamic-page-props';
import { PublishingCalendarProps, PublishingCalendarEntryProps } from './publishing-calendar-props';
import { PictogramsProps } from './pictograms';
import { GlobalCaseTimeSetProps, GlobalValuesProps } from './global-values-props';
import { ContactInformationProps } from './contact-information-props';
import { PayoutDatesProps } from './payout-dates';
import { FragmentPageProps } from './fragment-page-props';
import { AreaPageProps, FrontPageNestedProps, FrontPageProps } from './index-pages-props';
import { FormDetailsPageProps } from './form-details';
import { FallbackPageProps } from './fallback-page-props';
import { OversiktPageProps } from './oversikt-props';

export enum ContentType {
    AlertInContext = 'no.nav.navno:alert-in-context',
    AreaPage = 'no.nav.navno:area-page',
    Calculator = 'no.nav.navno:calculator',
    ContactInformationPage = 'no.nav.navno:contact-information',
    ContactStepPage = 'no.nav.navno:contact-step-page',
    ContentList = 'no.nav.navno:content-list',
    CurrentTopicPage = 'no.nav.navno:current-topic-page',
    DynamicPage = 'no.nav.navno:dynamic-page',
    Error = 'error',
    ExternalLink = 'no.nav.navno:external-link',
    FallbackPage = 'no.nav.navno:fallback-page',
    FormDetails = 'no.nav.navno:form-details',
    FormIntermediateStepPage = 'no.nav.navno:form-intermediate-step',
    FormsOverview = 'no.nav.navno:forms-overview', // Blir avviklet til fordel for Oversikt
    Fragment = 'portal:fragment',
    FrontPage = 'no.nav.navno:front-page',
    FrontPageNested = 'no.nav.navno:front-page-nested',
    GenericPage = 'no.nav.navno:generic-page',
    GlobalCaseTimeSet = 'no.nav.navno:global-case-time-set',
    GlobalNumberValuesSet = 'no.nav.navno:global-value-set',
    GuidePage = 'no.nav.navno:guide-page',
    InternalLink = 'no.nav.navno:internal-link',
    LargeTable = 'no.nav.navno:large-table',
    MainArticle = 'no.nav.navno:main-article',
    MainArticleChapter = 'no.nav.navno:main-article-chapter',
    Melding = 'no.nav.navno:melding',
    OfficeEditorialPage = 'no.nav.navno:office-editorial-page',
    OfficeInformation = 'no.nav.navno:office-information',
    OfficePage = 'no.nav.navno:office-page',
    Overview = 'no.nav.navno:overview', // Blir avviklet til fordel for Oversikt
    Oversikt = 'no.nav.navno:oversikt',
    PageList = 'no.nav.navno:page-list',
    PayoutDates = 'no.nav.navno:payout-dates',
    Pictograms = 'no.nav.navno:animated-icons',
    PressLandingPage = 'no.nav.navno:press-landing-page',
    ProductDetails = 'no.nav.navno:product-details',
    ProductPage = 'no.nav.navno:content-page-with-sidemenus',
    PublishingCalendar = 'no.nav.navno:publishing-calendar',
    PublishingCalendarEntry = 'no.nav.navno:publishing-calendar-entry',
    SectionPage = 'no.nav.navno:section-page',
    Site = 'portal:site',
    SituationPage = 'no.nav.navno:situation-page',
    TemplatePage = 'portal:page-template',
    ThemedArticlePage = 'no.nav.navno:themed-article-page',
    ToolsPage = 'no.nav.navno:tools-page',
    TransportPage = 'no.nav.navno:transport-page',
    Url = 'no.nav.navno:url',
    UserTestsConfig = 'no.nav.navno:user-tests-config',
    Video = 'no.nav.navno:video',
}

export const innholdsTypeMap: Record<ContentType, string> = {
    [ContentType.CurrentTopicPage]: 'Aktuelt',
    [ContentType.InternalLink]: 'Intern Lenke',
    [ContentType.ExternalLink]: 'Ekstern Lenke',
    [ContentType.LargeTable]: 'Ekstra stor tabell',
    [ContentType.OfficeInformation]: 'Enhetsinformasjon',
    [ContentType.AreaPage]: 'Områdeside',
    [ContentType.GenericPage]: 'Generisk side',
    [ContentType.GlobalCaseTimeSet]: 'Saksbehandlingstider',
    [ContentType.GlobalNumberValuesSet]: 'Globale tall-verdier',
    [ContentType.GuidePage]: 'Slik gjør du det',
    [ContentType.FrontPage]: 'Forside',
    [ContentType.FrontPageNested]: 'Underforside',
    [ContentType.Melding]: 'Driftsmelding',
    [ContentType.FormDetails]: 'Skjemadetaljer',
    [ContentType.FormsOverview]: 'Skjemaoversikt',
    [ContentType.FormIntermediateStepPage]: 'Mellomsteg for søknad, skjema, klage og ettersendelse',
    [ContentType.ContactStepPage]: 'Mellomsteg for kontaktside',
    [ContentType.ContactInformationPage]: 'Kontaktinformasjon',
    [ContentType.Calculator]: 'Kalkulator',
    [ContentType.Pictograms]: 'Piktogram',
    [ContentType.PressLandingPage]: 'Landingsside for presse',
    [ContentType.OfficeEditorialPage]: 'Kontorside for redaktørinnhold',
    [ContentType.OfficePage]: 'Kontorside (gammel)',
    [ContentType.PageList]: 'Artikkelliste',
    [ContentType.MainArticle]: 'Artikkel',
    [ContentType.MainArticleChapter]: 'Kapittel',
    [ContentType.ProductDetails]: 'Produktdetaljer',
    [ContentType.ProductPage]: 'Produktside',
    [ContentType.Overview]: 'Oversiktsside',
    [ContentType.Oversikt]: 'Oversiktside',
    [ContentType.PayoutDates]: 'Utbetalingsdatoer',
    [ContentType.ContentList]: 'Innholdsliste',
    [ContentType.UserTestsConfig]: 'Brukertester',
    [ContentType.Video]: 'Qbrick Video',
    [ContentType.AlertInContext]: 'Varsel i kontekst',
    [ContentType.PublishingCalendar]: 'Publiseringskalender',
    [ContentType.PublishingCalendarEntry]: 'Kalenderhendelse',
    [ContentType.SectionPage]: 'Oppslagstavle',
    [ContentType.SituationPage]: 'Situasjonsside',
    [ContentType.ThemedArticlePage]: 'Temaartikkel',
    [ContentType.ToolsPage]: 'Verktøy-side',
    [ContentType.TransportPage]: 'Transportside',
    [ContentType.DynamicPage]: 'Dynamisk side',

    [ContentType.Error]: `Ugyldig type: [${ContentType.Error}]`,
    [ContentType.Site]: `Ugyldig type: [${ContentType.Site}]`,
    [ContentType.Fragment]: `Ugyldig type: [${ContentType.Fragment}]`,
    [ContentType.TemplatePage]: `Ugyldig type: [${ContentType.TemplatePage}]`,
    [ContentType.Url]: `Ugyldig type: [${ContentType.Url}]`,
    [ContentType.FallbackPage]: `Ugyldig type: [${ContentType.FallbackPage}]`,
};

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
    noRedirect?: boolean;
};

type ContentCommonData = Partial<{
    audience: AudienceOptions;
    canonicalUrl: string;
    chatbotToggle: boolean;
    customPath?: string;
    description: string;
    feedbackToggle: boolean;
    hideIngress: boolean;
    ingress: string;
    metaDescription: string;
    noindex: boolean;
    nosnippet: boolean;
    showSubsectionNavigation?: boolean;
    title: string;
}>;

// These fields are returned only when using the version selector
type VersionSelectorProps = {
    liveId?: string;
    liveLocale?: string;
};

export type ContentCommonProps<Type extends ContentType = ContentType> = {
    type: Type;
    data?: ContentCommonData;
    originalType?: ContentType;
    children?: ContentCommonProps[];
    parent?: ContentCommonProps;
    page?: LayoutComponentProps;
    editorView?: 'inline' | 'preview' | 'edit' | 'archive';
    breadcrumbs?: DecoratorParams['breadcrumbs'];
    isFailover?: boolean;
    languages?: LanguageProps[];
    contentLayer?: string;
    redirectToLayer?: LayerLocale;
} & ContentAndMediaCommonProps &
    VersionSelectorProps;

type SpecificContentProps =
    | AreaPageProps
    | ContactInformationProps
    | ContactStepPageProps
    | ContentListProps
    | CurrentTopicPageProps
    | DynamicPageProps
    | ErrorProps
    | ExternalLinkProps
    | FallbackPageProps
    | FormDetailsPageProps
    | FormIntermediateStepPageProps
    | FormsOverviewProps
    | FragmentPageProps
    | FrontPageNestedProps
    | FrontPageProps
    | GenericPageProps
    | GlobalCaseTimeSetProps
    | GlobalValuesProps
    | GuidePageProps
    | InternalLinkProps
    | LargeTableProps
    | MainArticleChapterProps
    | MainArticleProps
    | OfficeEditorialPageProps
    | OfficeInformationProps
    | OfficePageProps
    | OverviewPageProps
    | OversiktPageProps
    | PageListProps
    | PayoutDatesProps
    | PictogramsProps
    | PressLandingPageProps
    | ProductDetailsProps
    | ProductPageProps
    | PublishingCalendarEntryProps
    | PublishingCalendarProps
    | SectionPageProps
    | SiteProps
    | SituationPageProps
    | TemplateProps
    | ThemedArticlePageProps
    | ToolsPageProps
    | TransportPageProps
    | UrlProps;

export type ContentProps<Type extends ContentType = ContentType> = ContentCommonProps<Type> &
    SpecificContentProps;
