import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { UsageCheck } from 'components/_editor-only/usage-check/UsageCheck';
import { ContentType } from 'types/content-props/_content-common';
import { VideoPageProps } from 'types/content-props/video';

export const VideoPage = (props: VideoPageProps) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    const { _id } = props;

    if (!editorView) {
        return null;
    }

    return (
        <div>
            <UsageCheck id={_id} type={ContentType.Video} />
        </div>
    );
};
