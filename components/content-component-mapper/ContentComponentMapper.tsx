import React from 'react';
import { ContentTypeSchemas } from '../../types/schemas/_schemas';

type Props = {
    contentData: ContentTypeSchemas | undefined;
};

const ContentComponentMapper = ({ contentData }: Props) => {
    if (!contentData) {
        return null;
    }

    return <>{contentData.type}</>;
};

export default ContentComponentMapper;
