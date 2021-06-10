import React from 'react';
import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { DynamicPage } from './pages/dynamic-page/DynamicPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import LargeTablePage from './pages/large-table-page/LargeTablePage';
import { ClientsideRedirect } from './ClientsideRedirect';
import { TemplatePage } from './pages/template-page/TemplatePage';
import { make404Props } from '../utils/make-error-props';
import { SituationPage } from './pages/situation-page/SituationPage';
import { ProductPage } from './pages/product-page/ProductPage';

const contentToReactComponent: Partial<
    { [key in ContentType]: React.FunctionComponent<ContentProps> }
> = {
    [ContentType.Error]: ErrorPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.TemplatePage]: TemplatePage,
    [ContentType.AnimatedIcons]: () => null, // TODO: add a preview-page for editors

    [ContentType.SituationPage]: SituationPage,
    [ContentType.ProductPage]: ProductPage,

    [ContentType.DynamicPage]: DynamicPage,
    [ContentType.MainArticle]: DynamicPage,
    [ContentType.MainArticleChapter]: DynamicPage,
    [ContentType.OfficeInformation]: DynamicPage,
    [ContentType.PageList]: DynamicPage,
    [ContentType.SectionPage]: DynamicPage,
    [ContentType.TransportPage]: DynamicPage,
    [ContentType.PublishingCalendar]: DynamicPage,
    [ContentType.Melding]: DynamicPage,

    [ContentType.ExternalLink]: ClientsideRedirect,
    [ContentType.InternalLink]: ClientsideRedirect,
    [ContentType.Site]: ClientsideRedirect,
    [ContentType.Url]: ClientsideRedirect,
};

export const isContentTypeImplemented = (content: ContentProps) =>
    contentToReactComponent.hasOwnProperty(content.__typename);

type Props = {
    content: ContentProps;
};

export const ContentMapper = ({ content }: Props) => {
    const Component = contentToReactComponent[content.__typename];

    return Component ? (
        <Component {...content} />
    ) : (
        <ErrorPage {...make404Props(content._path)} />
    );
};

export default ContentMapper;
