import React from 'react';
import { ContentType, ContentTypeSchemas } from '../../types/schemas/_schemas';
import { SectionPage } from '../page-components/section-page/SectionPage';
import LegacyHtml from '../page-components/legacy-html/LegacyHtml';

export const contentToComponentMap = {
    [ContentType.SectionPage]: SectionPage,
    [ContentType.NotImplemented]: LegacyHtml,
};

type Props = {
    contentData: ContentTypeSchemas | undefined;
};

const ContentComponentMapper = ({ contentData }: Props) => {
    if (!contentData) {
        return null;
    }

    const Component = contentToComponentMap[contentData.type];

    return <Component {...contentData} />;
};

export default ContentComponentMapper;
