import React from 'react';
import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import LegacyPage from './pages/legacy-page/LegacyPage';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';
import { DynamicPage } from './pages/regions-page/DynamicPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import LargeTablePage from './pages/large-table-page/LargeTablePage';
import { ClientsideRedirect } from './ClientsideRedirect';

export const contentToComponentMap = {
    [ContentType.Error]: ErrorPage,
    [ContentType.Legacy]: LegacyPage,
    [ContentType.SectionPage]: DynamicPage,
    [ContentType.TransportPage]: DynamicPage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.DynamicPage]: DynamicPage,
    [ContentType.MainArticle]: DynamicPage,
    [ContentType.MainArticleChapter]: DynamicPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.TemplatePage]: DynamicPage,
    [ContentType.PageList]: DynamicPage,
    [ContentType.ExternalLink]: ClientsideRedirect,
    [ContentType.InternalLink]: ClientsideRedirect,
    [ContentType.Site]: ClientsideRedirect,
};

type Props = {
    content: ContentTypeSchema | undefined;
};

export const ContentToComponentMapper = ({ content }: Props) => {
    const Component = contentToComponentMap[content.__typename];

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

export default ContentToComponentMapper;
