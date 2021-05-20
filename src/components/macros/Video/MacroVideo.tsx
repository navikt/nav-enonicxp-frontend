import React from 'react';
import { VideoMacroProps } from '../../../types/macro-props/video';
import './MacroVideo.less';

export const MacroVideo = ({ config }: VideoMacroProps) => {
    if (!config?.video) {
        return null;
    }

    const { video, title } = config.video;

    return (
        <div className={'macro-video'}>
            <iframe
                title={`Video: ${title}`}
                src={video}
                allow={'fullscreen'}
            />
        </div>
    );
};
