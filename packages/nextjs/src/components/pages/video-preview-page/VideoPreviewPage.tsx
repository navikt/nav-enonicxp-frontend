import React from 'react';
import { VideoPageProps } from 'types/content-props/video';
import { EditorHelp } from '@/editor-tools/src/components/editor-help/EditorHelp';
import { QbrickVideo } from 'components/_common/qbrick-video/QbrickVideo';
import { buildQbrickVideoProps } from 'components/_common/qbrick-video/utils/videoProps';

import styles from './VideoPreviewPage.module.scss';

export const VideoPreviewPage = (props: VideoPageProps) => {
    if (!props.data.title || !props.data.mediaId) {
        return (
            <EditorHelp text="Sett inn tittel og media-id i fanen til venstre for å forhåndsvise videoen her." />
        );
    }

    const videoProps = buildQbrickVideoProps(props.data, props.language);

    return (
        <div className={styles.videoPage}>
            <QbrickVideo {...videoProps} />
        </div>
    );
};
