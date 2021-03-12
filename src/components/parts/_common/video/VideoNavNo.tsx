import React from 'react';
import { BEM } from 'utils/classnames';
import './VideoNavNo.less';

export type VideoProps = {
    src: string;
    title: string;
};

const VideoNavNo = ({ title, src }: VideoProps) => {
    const bem = BEM('video-navno');
    return (
        <div className={bem()}>
            <iframe title={title} src={src} allow="fullscreen" />
        </div>
    );
};

export default VideoNavNo;
