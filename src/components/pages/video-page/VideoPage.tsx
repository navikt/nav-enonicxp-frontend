import React from 'react';
import { VideoPageProps } from 'types/content-props/video';
import { RedirectTo404 } from 'components/_common/redirect-to-404/RedirectTo404';
import { MacroVideo } from 'components/macros/video/MacroVideo';
import { MacroVideoProps } from 'types/macro-props/video';
import { MacroType } from 'types/macro-props/_macros-common';

import styles from './VideoPage.module.scss';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const VideoPage = (props: VideoPageProps) => {
    if (!props.editorView) {
        return <RedirectTo404 />;
    }

    const macroVideoProps: MacroVideoProps = {
        name: MacroType.Video,
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
            <EditorHelp text="Sett inn tittel og media-id i kolonnen til venstre for å forhåndsvise videoen her." />
        );
    }

    return (
        <div className={styles.videoPage}>
            <MacroVideo {...macroVideoProps} />
        </div>
    );
};
