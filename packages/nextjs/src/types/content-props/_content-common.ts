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
import { ContactStepPageProps } from 'components/pages/contact-step-page/ContactStepPage';
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
import { FormIntermediateStepPageProps } from './form-intermediate-step';
import { FallbackPageProps } from './fallback-page-props';

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
    GuidePage = 'no.nav.navno:guide-page',
    ThemedArticlePage = 'no.nav.navno:themed-article-page',
    CurrentTopicPage = 'no.nav.navno:current-topic-page',
    SituationPage = 'no.nav.navno:situation-page',
    Pictograms = 'no.nav.navno:animated-icons',
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
    UserTestsConfig = 'no.nav.navno:user-tests-config',
    Video = 'no.nav.navno:video',
    AlertInContext = 'no.nav.navno:alert-in-context',
    OfficePage = 'no.nav.navno:office-page',
    FallbackPage = 'no.nav.navno:fallback-page',
    ContactStepPage = 'no.nav.navno:contact-step-page',
}

export const innholdsTypeMap: Record<ContentType, string> = {
    [ContentType.InternalLink]: 'Intern Lenke',
    [ContentType.ExternalLink]: 'Ekstern Lenke',
    [ContentType.SectionPage]: 'Oppslagstavle',
    [ContentType.TransportPage]: 'Transportside',
    [ContentType.DynamicPage]: 'Dynamisk side',
    [ContentType.ContentList]: 'Innholdsliste',
    [ContentType.ContactInformationPage]: 'Kontaktinformasjon',
    [ContentType.GenericPage]: 'Generisk side',
    [ContentType.PageList]: 'Artikkelliste',
    [ContentType.MainArticle]: 'Artikkel',
    [ContentType.MainArticleChapter]: 'Kapittel',
    [ContentType.Melding]: 'Driftsmelding',
    [ContentType.LargeTable]: 'Ekstra stor tabell',
    [ContentType.OfficeInformation]: 'Enhetsinformasjon',
    [ContentType.PublishingCalendar]: 'Publiseringskalender',
    [ContentType.PublishingCalendarEntry]: 'Kalenderhendelse',
    [ContentType.GlobalNumberValuesSet]: 'Globale tall-verdier',
    [ContentType.ProductPage]: 'Produktside',
    [ContentType.ProductDetails]: 'Produktdetaljer',
    [ContentType.OfficeEditorialPage]: 'Kontorside for redaktørinnhold',
    [ContentType.GuidePage]: 'Slik gjør du det',
    [ContentType.ThemedArticlePage]: 'Temaartikkel',
    [ContentType.CurrentTopicPage]: 'Aktuelt',
    [ContentType.SituationPage]: 'Situasjonsside',
    [ContentType.Pictograms]: 'Piktogram',
    [ContentType.ToolsPage]: 'Verktøy-side',
    [ContentType.Calculator]: 'Kalkulator',
    [ContentType.Overview]: 'Oversiktsside',
    [ContentType.GlobalCaseTimeSet]: 'Saksbehandlingstider',
    [ContentType.PayoutDates]: 'Utbetalingsdatoer',
    [ContentType.FrontPage]: 'Forside',
    [ContentType.FrontPageNested]: 'Underforside',
    [ContentType.AreaPage]: 'Områdeside',
    [ContentType.PressLandingPage]: 'Landingsside for presse',
    [ContentType.FormDetails]: 'Skjemadetaljer',
    [ContentType.FormIntermediateStepPage]: 'Mellomsteg for søknad, skjema, klage og ettersendelse',
    [ContentType.FormsOverview]: 'Skjemaoversikt',
    [ContentType.UserTestsConfig]: 'Brukertester',
    [ContentType.Video]: 'Qbrick Video',
    [ContentType.AlertInContext]: 'Varsel i kontekst',
    [ContentType.OfficePage]: 'Kontorside (gammel)',
    [ContentType.ContactStepPage]: 'Mellomsteg for kontaktside',

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
    feedbackToggle: boolean;
    chatbotToggle: boolean;
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    nosnippet: boolean;
    ingress: string;
    hideIngress: boolean;
    title: string;
    description: string;
    audience: AudienceOptions;
    showSubsectionNavigation?: boolean;
    customPath?: string;
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
    | SiteProps
    | TemplateProps
    | ContentListProps
    | ContactStepPageProps
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
    | OfficePageProps
    | PictogramsProps
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
    | FormsOverviewProps
    | FallbackPageProps
    | ContactStepPageProps;

export type ContentProps<Type extends ContentType = ContentType> = ContentCommonProps<Type> &
    SpecificContentProps;
