import React from 'react';
import { ContentType, ContentTypeProps } from '../types/content/_common';
import LegacyPage from './pages/legacy-page/LegacyPage';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { makeErrorProps } from '../types/content/error-props';
import { RegionsPage } from './pages/regions-page/RegionsPage';
import { FragmentPage } from './pages/fragment-page/FragmentPage';
import LargeTablePage from './pages/large-table-page/LargeTablePage';
import { ClientsideRedirect } from './ClientsideRedirect';

export const contentToComponentMap = {
    [ContentType.Error]: ErrorPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.Legacy]: LegacyPage,

    [ContentType.DynamicPage]: RegionsPage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.MainArticle]: RegionsPage,
    [ContentType.MainArticleChapter]: RegionsPage,
    [ContentType.PageList]: RegionsPage,
    [ContentType.SectionPage]: RegionsPage,
    [ContentType.TemplatePage]: RegionsPage,
    [ContentType.TransportPage]: RegionsPage,

    [ContentType.ExternalLink]: ClientsideRedirect,
    [ContentType.InternalLink]: ClientsideRedirect,
    [ContentType.Site]: ClientsideRedirect,
};

type Props = {
    content: ContentTypeProps | undefined;
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
