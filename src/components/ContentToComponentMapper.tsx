import React from 'react';
import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { SectionPage } from './page-components/section-page/SectionPage';
import { TransportPage } from './page-components/transport-page/TransportPage';
import LegacyHtml from './page-components/legacy-page/LegacyHtml';

export const contentToComponentMap = {
    [ContentType.NotImplemented]: LegacyHtml,
    [ContentType.SectionPage]: SectionPage,
    [ContentType.TransportPage]: TransportPage,
};

type Props = {
    content: ContentTypeSchema | undefined;
};

export const ContentToComponentMapper = ({ content }: Props) => {
    const Component = contentToComponentMap[content.__typename];

    return <Component {...content} />;
};

export default ContentToComponentMapper;
