import React from 'react';
import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { SectionPage } from './page-components/section-page/SectionPage';
import { TransportPage } from './page-components/transport-page/TransportPage';
import LegacyPage from './page-components/legacy-page/LegacyPage';
import { ErrorPage } from './page-components/error-page/ErrorPage';
import { makeErrorProps } from '../types/content-types/error-props';
import { FragmentPage } from './page-components/fragment-page/FragmentPage';

export const contentToComponentMap = {
    [ContentType.Error]: ErrorPage,
    [ContentType.Legacy]: LegacyPage,
    [ContentType.SectionPage]: SectionPage,
    [ContentType.TransportPage]: TransportPage,
    [ContentType.Fragment]: FragmentPage,
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
