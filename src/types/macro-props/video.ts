import { VideoData } from 'types/content-props/video';
import { MacroPropsCommon, MacroType } from './_macros-common';

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
