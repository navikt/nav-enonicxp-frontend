import { BitmapImage } from 'types/media';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroVideoProps extends MacroPropsCommon {
    name: MacroType.Video;
    config: {
        video: {
            targetContent?: {
                data: {
                    accountId: string;
                    title: string;
                    duration: number;
                    mediaId: string;
                    poster: BitmapImage;
                    subtitles?: string[];
                };
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
