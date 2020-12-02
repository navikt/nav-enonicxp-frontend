import * as React from 'react';
import VideoNavNo from '../../_common/video/VideoNavNo';

export type VideoProps = {
    title: string;
    video: string;
}
export const VideoKeys = ['title', 'video'];

export const Video = ({title, video}: VideoProps) => {
    return (
        <VideoNavNo src={video} title={title} />
    );
};

