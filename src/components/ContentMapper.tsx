import React from 'react';
import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-props/error-props';
import { DynamicPage } from './pages/dynamic-page/DynamicPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import LargeTablePage from './pages/large-table-page/LargeTablePage';
import { ClientsideRedirect } from './ClientsideRedirect';
import { TemplatePage } from './pages/template-page/TemplatePage';

export const contentToReactComponent: Partial<
    { [key in ContentType]: React.FunctionComponent<ContentProps> }
> = {
    [ContentType.Error]: ErrorPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.TemplatePage]: TemplatePage,

    [ContentType.DynamicPage]: DynamicPage,
    [ContentType.MainArticle]: DynamicPage,
    [ContentType.MainArticleChapter]: DynamicPage,
    [ContentType.OfficeInformation]: DynamicPage,
    [ContentType.PageList]: DynamicPage,
    [ContentType.SectionPage]: DynamicPage,
    [ContentType.TemplatePage]: DynamicPage,
    [ContentType.TransportPage]: DynamicPage,

    [ContentType.ExternalLink]: ClientsideRedirect,
    [ContentType.InternalLink]: ClientsideRedirect,
    [ContentType.Site]: ClientsideRedirect,
};

type Props = {
    content: ContentProps;
};

export const ContentMapper = ({ content }: Props) => {
    const Component = contentToReactComponent[content.__typename];

    return Component ? (
        <Component {...content} />
    ) : (
        <ErrorPage
            {...makeErrorProps(
                content._path,
                `Content type not implemented: ${content.__typename}`,
                501
            )}
        />
    );
};

export default ContentMapper;
