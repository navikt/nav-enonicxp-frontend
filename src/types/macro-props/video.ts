import { MacroPropsCommon, MacroType } from './_macros-common';
import { VideoData } from 'types/content-props/video';

export interface MacroVideoProps extends MacroPropsCommon {
    name: MacroType.Video;
    config: {
        video: {
            targetContent?: {
                data: VideoData;
            };
            video?: string;
            title?: string;
            language?: string;
        };
    };
}

export type VideoMeta = {
    accountId: string;
    mediaId: string;
    poster: string;
    title: string;
    duration: number;
    language?: string;
};
