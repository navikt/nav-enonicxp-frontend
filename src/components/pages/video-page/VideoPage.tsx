import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { UsageCheck } from 'components/_editor-only/usage-check/UsageCheck';
import { ContentType } from 'types/content-props/_content-common';
import { VideoPageProps } from 'types/content-props/video';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

export const VideoPage = (props: VideoPageProps) => {
    const { pageConfig } = usePageConfig();
    const { editorView } = pageConfig;

    const { _id } = props;

    if (!editorView) {
        return <RedirectTo404 />;
    }

    return (
        <div>
            <UsageCheck id={_id} type={ContentType.Video} />
        </div>
    );
};
