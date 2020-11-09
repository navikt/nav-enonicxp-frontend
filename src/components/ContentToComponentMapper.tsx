import React from 'react';
import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import LegacyPage from './page-components/legacy-page/LegacyPage';
import { ErrorPage } from './page-components/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';
import { DynamicPage } from './page-components/_dynamic/DynamicPage';
import { FragmentPage } from './page-components/fragment-page/FragmentPage';
import LargeTablePage from './page-components/large-table-page/LargeTablePage';
import { ExternalRedirect } from './ExternalRedirect';

export const contentToComponentMap = {
    [ContentType.Error]: ErrorPage,
    [ContentType.Legacy]: LegacyPage,
    [ContentType.SectionPage]: DynamicPage,
    [ContentType.TransportPage]: DynamicPage,
    [ContentType.Fragment]: FragmentPage,
    [ContentType.DynamicPage]: DynamicPage,
    [ContentType.LargeTable]: LargeTablePage,
    [ContentType.TemplatePage]: DynamicPage,
    [ContentType.ExternalLink]: ExternalRedirect,
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
                `Content type not implemented: ${content.__typename}.
                 (This error should never occur, double-check content-fetch logic!)`
            )}
        />
    );
};

export default ContentToComponentMapper;
