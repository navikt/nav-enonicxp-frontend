import { ContentCommonProps, ContentType } from './_content-common';
import { LinkSelectable } from 'types/component-props/_mixins';
import { BitmapImage } from 'types/media';

export type FormComplaintTypes = 'complaint' | 'appeal';

export interface Variation<T = string> {
    type?: T;
    link?: LinkSelectable;
    label?: string;
}

export interface VideoData {
    accountId: string;
    title: string;
    duration: number;
    mediaId: string;
    poster: BitmapImage;
    subtitles?: string[];
}

export type VideoPageProps = {
    type: ContentType.Video;
    data: VideoData;
} & ContentCommonProps;
