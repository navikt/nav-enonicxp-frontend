import { ContentCommonProps, ContentType } from './_content-common';
import { RasterImage } from 'types/media';

export type VideoData = {
    accountId: string;
    title: string;
    duration: number;
    mediaId: string;
    poster: RasterImage;
    subtitles?: string[];
};

export type VideoPageProps = {
    type: ContentType.Video;
    data: VideoData;
} & ContentCommonProps;
