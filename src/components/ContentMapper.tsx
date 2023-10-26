import React from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { DynamicPage } from './pages/dynamic-page/DynamicPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import { ContactInformationPage } from './pages/contact-information-page/ContactInformationPage';
import { LargeTablePage } from './pages/large-table-page/LargeTablePage';
import { RedirectPage } from './pages/redirect-page/RedirectPage';
import { TemplatePage } from './pages/template-page/TemplatePage';
import { SituationPage } from './pages/situation-page/SituationPage';
import { GuidePage } from './pages/guide-page/GuidePage';
import { OverviewPage } from './pages/overview-page/OverviewPage';
import { OfficeEditorialPage } from './pages/office-editorial-page/OfficeEditorialPage';
import { OfficeBranchPage } from './pages/office-branch-page/OfficeBranchPage';
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
import { ContentTypeNotSupportedPage } from 'components/pages/contenttype-not-supported-page/ContentTypeNotSupportedPage';
import { FormIntermediateStepPage } from './pages/form-intermediate-step-page/FormIntermediateStepPage';
import { FormDetailsPreviewPage } from 'components/pages/form-details-preview-page/FormDetailsPreviewPage';
import { FormsOverviewPage } from 'components/pages/forms-overview-page/FormsOverviewPage';
import { VideoPage } from './pages/video-page/VideoPage';
import { CalculatorPage } from './pages/calculator-page/CalculatorPage';
import { PageMeta } from './pages/page-meta/PageMeta';
import { ProductPageV2 } from './pages/product-page-v2/ProductPageV2';
import { CurrentTopicPageV2 } from './pages/current-topic-page-v2/CurrentTopicPageV2';
import { GenericPageV2 } from './pages/generic-page-v2/GenericPageV2';
import { ThemedArticlePageV2 } from './pages/themed-article-page-v2/ThemedArticlePageV2';
import { SituationPageV2 } from './pages/situation-page-v2/SituationPageV2';
import { GuidePageV2 } from './pages/guide-page-v2/GuidePageV2';

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
    [ContentType.Video]: VideoPage,
    [ContentType.ContactInformationPage]: ContactInformationPage,
    [ContentType.PayoutDates]: PayoutDatesPage,

    [ContentType.PageMeta]: PageMeta,

    [ContentType.Calculator]: CalculatorPage,
    [ContentType.CurrentTopicPage]: CurrentTopicPage,
    [ContentType.CurrentTopicPageV2]: CurrentTopicPageV2,
    [ContentType.FormDetails]: FormDetailsPreviewPage,
    [ContentType.FormIntermediateStepPage]: FormIntermediateStepPage,
    [ContentType.FormsOverview]: FormsOverviewPage,
    [ContentType.GenericPage]: GenericPage,
    [ContentType.GenericPageV2]: GenericPageV2,
    [ContentType.GuidePage]: GuidePage,
    [ContentType.GuidePageV2]: GuidePageV2,
    [ContentType.OfficeBranchPage]: OfficeBranchPage,
    [ContentType.OfficeEditorialPage]: OfficeEditorialPage,
    [ContentType.Overview]: OverviewPage,
    [ContentType.PressLandingPage]: PressLandingPage,
    [ContentType.ProductPage]: ProductPage,
    [ContentType.ProductPageV2]: ProductPageV2,
    [ContentType.SituationPage]: SituationPage,
    [ContentType.SituationPageV2]: SituationPageV2,
    [ContentType.ThemedArticlePage]: ThemedArticlePage,
    [ContentType.ThemedArticlePageV2]: ThemedArticlePageV2,

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
    contentToReactComponent.hasOwnProperty(content.type);

type Props = {
    content: ContentProps;
};

export const ContentMapper = ({ content }: Props) => {
    const Component =
        contentToReactComponent[content.type] || ContentTypeNotSupportedPage;

    // @ts-ignore
    return <Component {...content} />;
};
