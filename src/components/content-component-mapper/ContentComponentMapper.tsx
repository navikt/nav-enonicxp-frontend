import React from 'react';
import { ContentType, ContentTypeSchemas } from '../../types/schemas/_schemas';
import { SectionPage } from '../section-page/SectionPage';

type Props = {
    contentData: ContentTypeSchemas | undefined;
};

const ContentComponentMapper = ({ contentData }: Props) => {
    if (!contentData) {
        return null;
    }

    switch (contentData.type) {
        case ContentType.SectionPage:
            return <SectionPage {...contentData} />;
        default:
            return <>{contentData.type}</>;
    }
};

export default ContentComponentMapper;
