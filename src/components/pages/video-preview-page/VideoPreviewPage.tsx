import React from 'react';
import { VideoPageProps } from 'types/content-props/video';
import { MacroVideo } from 'components/macros/video/MacroVideo';
import { MacroVideoProps } from 'types/macro-props/video';
import { MacroType } from 'types/macro-props/_macros-common';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

import styles from './VideoPreviewPage.module.scss';

export const VideoPreviewPage = (props: VideoPageProps) => {
    const macroVideoProps: MacroVideoProps = {
        name: MacroType.Video,
        ref: '',
        config: {
            video: {
                targetContent: {
                    data: props.data,
                },
            },
        },
    };

    if (!props.data.title || !props.data.mediaId) {
        return (
            <EditorHelp text="Sett inn tittel og media-id i fanen til venstre for å forhåndsvise videoen her." />
        );
    }

    return (
        <div className={styles.videoPage}>
            <MacroVideo {...macroVideoProps} />
        </div>
    );
};
