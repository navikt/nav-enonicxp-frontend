import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { UsageCheck } from 'components/_editor-only/usage-check/UsageCheck';
import { ContentType } from 'types/content-props/_content-common';

export const VideoPage = () => {
    const { language: contentLanguage, pageConfig } = usePageConfig();
    const { editorView, pageId } = pageConfig;

    if (!editorView) {
        return null;
    }

    return (
        <div>
            <UsageCheck
                id={'bc48eb74-074a-4656-8cc6-96fdc8089efb'}
                type={ContentType.Video}
            />
        </div>
    );

    // return <Video {...props} />;
};
