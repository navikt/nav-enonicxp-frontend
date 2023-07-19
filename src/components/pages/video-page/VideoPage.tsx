import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';

export const VideoPage = () => {
    const { language: contentLanguage, pageConfig } = usePageConfig();
    const { editorView, pageId } = pageConfig;

    if (!editorView) {
        return null;
    }

    return <div>I am video page</div>;

    // return <Video {...props} />;
};
