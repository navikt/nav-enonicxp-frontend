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

const contentToReactComponent: {
    [key in ContentType]?: React.FunctionComponent<ContentProps>;
} = {
    [ContentType.Error]: ErrorPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.TemplatePage]: TemplatePage,
    [ContentType.GlobalNumberValuesSet]: GlobalValuesPage,
    [ContentType.GlobalCaseTimeSet]: GlobalValuesPage,
    [ContentType.ProductDetails]: ProductDetailsPage,
    [ContentType.ContactInformationPage]: ContactInformationPage,
    [ContentType.PayoutDates]: PayoutDatesPage,

    [ContentType.SituationPage]: SituationPage,
    [ContentType.ProductPage]: ProductPage,
    [ContentType.GuidePage]: GuidePage,
    [ContentType.ThemedArticlePage]: ThemedArticlePage,
    [ContentType.Overview]: OverviewPage,
    [ContentType.GenericPage]: GenericPage,
    [ContentType.CurrentTopicPage]: CurrentTopicPage,
    [ContentType.PressLandingPage]: PressLandingPage,

    [ContentType.AreaPage]: DynamicPage,
    [ContentType.FrontPage]: DynamicPage,

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

    [ContentType.ToolsPage]: ProductPage,
};

export const isContentTypeImplemented = (content: ContentProps) =>
    contentToReactComponent.hasOwnProperty(content.type);

type Props = {
    content: ContentProps;
};

export const ContentMapper = ({ content }: Props) => {
    const Component =
        contentToReactComponent[content.type] || ContentTypeNotSupportedPage;

    return <Component {...content} />;
};
