import React from 'react';
import { MacroVideoProps } from '../../../types/macro-props/video';
import './MacroVideo.less';

export const MacroVideo = ({ config }: MacroVideoProps) => {
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
