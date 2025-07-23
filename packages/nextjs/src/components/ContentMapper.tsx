import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { ContentTypeNotSupportedPage } from 'components/pages/contenttypeNotSupportedPage/ContentTypeNotSupportedPage';
import { FormDetailsPreviewPage } from 'components/pages/form-details-preview-page/FormDetailsPreviewPage';
import { FormsOverviewPage } from 'components/pages/forms-overview-page/FormsOverviewPage';
import { OversiktPage } from 'components/pages/oversikt-page/OversiktPage';
import { VideoPreviewPage } from 'components/pages/video-preview-page/VideoPreviewPage';
import { UserTestsConfigPreviewPage } from 'components/pages/user-tests-config-preview-page/UserTestsConfigPreviewPage';
import { ErrorPage } from './pages/errorPage/ErrorPage';
import { DynamicPage } from './pages/dynamic-page/DynamicPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import { ContactInformationPage } from './pages/contact-information-page/ContactInformationPage';
import { LargeTablePage } from './pages/large-table-page/LargeTablePage';
import { RedirectPage } from './pages/redirect-page/RedirectPage';
import { TemplatePage } from './pages/template-page/TemplatePage';
import { SituationPage } from './pages/situationPage/SituationPage';
import { GuidePage } from './pages/guide-page/GuidePage';
import { OverviewPage } from './pages/overview-page/OverviewPage';
import { OfficeEditorialPage } from './pages/office-editorial-page/OfficeEditorialPage';
import { ThemedArticlePage } from './pages/themed-article-page/ThemedArticlePage';
import { ProductPage } from './pages/product-page/ProductPage';
import { ProductDetailsPage } from './pages/product-details-page/ProductDetailsPage';
import { GlobalValuesPage } from './pages/global-values-page/GlobalValuesPage';
import { MainArticleChapterPage } from './pages/main-article-chapter-page/MainArticleChapterPage';
import { PayoutDatesPage } from './pages/payout-dates-page/PayoutDatesPage';
import { GenericPage } from './pages/generic-page/GenericPage';
import { CurrentTopicPage } from './pages/current-topic-page/CurrentTopicPage';
import { PressLandingPage } from './pages/press-landing-page/PressLandingPage';
import { PublishingCalendarEntryPage } from './parts/_legacy/publishing-calendar/PublishingCalendarEntryPage';
import { FormIntermediateStepPage } from './pages/formIntermediateStepPage/FormIntermediateStepPage';
import { KalkulatorPage } from './pages/kalkulator-page/KalkulatorPage';
import { AlertInContextPage } from './pages/alert-in-context-page/AlertInContextPage';
import { OfficePage } from './pages/office-page/OfficePage';
import { ContactStepPage } from './pages/contactStepPage/ContactStepPage';

const contentToReactComponent: {
    [key in ContentType]?: React.FunctionComponent<ContentProps<key>>;
} = {
    [ContentType.Error]: ErrorPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.TemplatePage]: TemplatePage,
    [ContentType.GlobalNumberValuesSet]: GlobalValuesPage,
    [ContentType.GlobalCaseTimeSet]: GlobalValuesPage,
    [ContentType.ProductDetails]: ProductDetailsPage,
    [ContentType.Video]: VideoPreviewPage,
    [ContentType.ContactInformationPage]: ContactInformationPage,
    [ContentType.PayoutDates]: PayoutDatesPage,

    [ContentType.SituationPage]: SituationPage,
    [ContentType.ProductPage]: ProductPage,
    [ContentType.GuidePage]: GuidePage,
    [ContentType.ThemedArticlePage]: ThemedArticlePage,
    [ContentType.Overview]: OverviewPage,
    [ContentType.Oversikt]: OversiktPage,
    [ContentType.GenericPage]: GenericPage,
    [ContentType.OfficeEditorialPage]: OfficeEditorialPage,
    [ContentType.OfficePage]: OfficePage,
    [ContentType.CurrentTopicPage]: CurrentTopicPage,
    [ContentType.PressLandingPage]: PressLandingPage,
    [ContentType.FormIntermediateStepPage]: FormIntermediateStepPage,
    [ContentType.FormDetails]: FormDetailsPreviewPage,
    [ContentType.FormsOverview]: FormsOverviewPage,
    [ContentType.Kalkulator]: KalkulatorPage,
    [ContentType.UserTestsConfig]: UserTestsConfigPreviewPage,
    [ContentType.AlertInContext]: AlertInContextPage,
    [ContentType.ContactStepPage]: ContactStepPage,

    [ContentType.AreaPage]: DynamicPage,
    [ContentType.FrontPage]: DynamicPage,
    [ContentType.FrontPageNested]: DynamicPage,

    [ContentType.DynamicPage]: DynamicPage,

    [ContentType.MainArticle]: DynamicPage,
    [ContentType.MainArticleChapter]: MainArticleChapterPage,
    [ContentType.OfficeInformation]: DynamicPage,
    [ContentType.PageList]: DynamicPage,
    [ContentType.SectionPage]: DynamicPage,
    [ContentType.TransportPage]: DynamicPage,
    [ContentType.PublishingCalendar]: DynamicPage,
    [ContentType.PublishingCalendarEntry]: PublishingCalendarEntryPage,
    [ContentType.Melding]: DynamicPage,

    [ContentType.ExternalLink]: RedirectPage,
    [ContentType.InternalLink]: RedirectPage,
    [ContentType.Site]: RedirectPage,
    [ContentType.Url]: RedirectPage,
};

export const isContentTypeImplemented = (content: ContentProps) =>
    Object.prototype.hasOwnProperty.call(contentToReactComponent, content.type);

type Props = {
    content: ContentProps;
};

export const ContentMapper = ({ content }: Props) => {
    const Component = contentToReactComponent[content.type] || ContentTypeNotSupportedPage;

    // @ts-ignore
    return <Component {...content} />;
};
