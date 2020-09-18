import React, { useEffect } from 'react';
import { ContentType, ContentTypeSchemas } from '../../types/schemas/_schemas';
import { SectionPage } from '../page-components/section-page/SectionPage';
import LegacyHtml from '../page-components/legacy-html/LegacyHtml';
import { useRouter } from 'next/router';
import { enonicPathToAppPath } from '../../utils/enonic-path';

export const contentToComponentMap = {
    [ContentType.NotImplemented]: LegacyHtml,
    [ContentType.SectionPage]: SectionPage,
};

type Props = {
    contentData: ContentTypeSchemas | undefined;
};

const ContentComponentMapper = ({ contentData }: Props) => {
    const router = useRouter();

    // Ensures the url displayed in the browser is correct after static redirection
    useEffect(() => {
        if (!contentData?._path) {
            return;
        }
        router.push(enonicPathToAppPath(contentData._path), undefined, {
            shallow: true,
        });
    }, [contentData]);

    if (!contentData) {
        return null;
    }

    const Component = contentToComponentMap[contentData.type];

    return <Component {...contentData} />;
};

export default ContentComponentMapper;
