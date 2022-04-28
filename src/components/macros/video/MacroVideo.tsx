import React from 'react';
import { MacroVideoProps } from '../../../types/macro-props/video';
import style from './MacroVideo.module.scss'

export const MacroVideo = ({ config }: MacroVideoProps) => {
    if (!config?.video) {
        return null;
    }
    const { video, title } = config.video;
    return (
        <div className={style.macroVideo}>
            <iframe
                title={`Video: ${title}`}
                src={video}
                allow={'fullscreen'}
            />
        </div>
    );
};
