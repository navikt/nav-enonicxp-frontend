import React from 'react';
import { VideoPageProps } from 'types/content-props/video';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';

export const VideoPage = (props: VideoPageProps) => {
    if (!props.editorView) {
        return <RedirectTo404 />;
    }

    return null;
};
