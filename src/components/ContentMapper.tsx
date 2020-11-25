import React from 'react';
import {
    ContentType,
    ContentTypeProps,
} from '../types/content-props/_content-common';
import LegacyPage from './pages/legacy-page/LegacyPage';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-props/error-props';
import { DynamicPage } from './pages/dynamic-page/DynamicPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import LargeTablePage from './pages/large-table-page/LargeTablePage';
import { ClientsideRedirect } from './ClientsideRedirect';
import { TemplatePage } from './pages/template-page/TemplatePage';

export const contentToReactComponent: Partial<
    { [key in ContentType]: React.FunctionComponent<ContentTypeProps> }
> = {
    [ContentType.Error]: ErrorPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.Legacy]: LegacyPage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.TemplatePage]: TemplatePage,

    [ContentType.DynamicPage]: DynamicPage,
    [ContentType.MainArticle]: DynamicPage,
    [ContentType.MainArticleChapter]: DynamicPage,
    [ContentType.PageList]: DynamicPage,
    [ContentType.SectionPage]: DynamicPage,
    [ContentType.TemplatePage]: DynamicPage,
    [ContentType.TransportPage]: DynamicPage,

    [ContentType.ExternalLink]: ClientsideRedirect,
    [ContentType.InternalLink]: ClientsideRedirect,
    [ContentType.Site]: ClientsideRedirect,
};

type Props = {
    content: ContentTypeProps;
};

export const ContentMapper = ({ content }: Props) => {
    const Component = contentToReactComponent[content.__typename];

    return Component ? (
        <Component {...content} />
    ) : (
        <ErrorPage
            {...makeErrorProps(
                content._path,
                `Content type not implemented: ${content.__typename}`
            )}
        />
    );
};

export default ContentMapper;
