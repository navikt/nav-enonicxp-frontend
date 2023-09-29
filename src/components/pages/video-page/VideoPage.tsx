import React from 'react';
import { ContentType } from 'types/content-props/_content-common';
import { VideoPageProps } from 'types/content-props/video';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';
import { DependenciesInfo } from 'components/_editor-only/dependencies-info/DependenciesInfo';

export const VideoPage = (props: VideoPageProps) => {
    if (!props.editorView) {
        return <RedirectTo404 />;
    }

    return (
        <DependenciesInfo
            contentId={props._id}
            contentLayer={props.contentLayer}
            type={ContentType.Video}
        />
    );
};
