import { parse } from 'querystring';
import { MacroVideoProps, VideoMeta } from 'types/macro-props/video';
import { QbrickMeta, Resource } from 'types/qbrickMeta';

export const getVideoMeta = (
    video: MacroVideoProps['config']['video']
): VideoMeta => {
    // For now, support legcy video with only the URL to go after.
    if (!video.targetContent) {
        const query = parse(video.video.split('?')[1]);
        return {
            accountId: query.accountId as string,
            title: video.title,
            duration: null,
            mediaId: query.mediaId as string,
            poster: null,
        };
    }

    return {
        accountId: video.targetContent?.data.accountId,
        mediaId: video.targetContent?.data.mediaId,
        duration: video.targetContent?.data.duration,
        poster: video.targetContent?.data.poster.mediaUrl,
        title: video.targetContent?.data.title,
    };
};

// Todo: Skrive om disse to funksjonene for bedre gjenbruk. De er nesten like.
export const findImageUrlFromVideoMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return null;
    }

    const firstImageResource = resources?.find(
        (resource: Resource) => resource.type === 'image'
    );

    if (!firstImageResource) {
        return null;
    }

    const imageRenditions = firstImageResource.renditions?.sort(
        (a, b) => a.width - b.width
    );

    if (imageRenditions.length === 0) {
        return null;
    }

    return (
        imageRenditions[0].links?.find((link) => link.mimeType === 'image/jpg')
            ?.href || null
    );
};

export const findVideoDurationFromMeta = (qbrickMediaData: QbrickMeta) => {
    const resources = qbrickMediaData?.asset?.resources;
    if (!resources) {
        return 0;
    }
    const firstVideoResource = resources?.find(
        (resource: Resource) => resource.type === 'video'
    );
    if (!firstVideoResource) {
        return 0;
    }

    const firstRentition = firstVideoResource.renditions?.find(
        (rendition) => rendition.type === 'video'
    );

    if (!firstRentition) {
        return 0;
    }

    const firstVideo = firstRentition.videos?.[0];
    if (!firstVideo) {
        return 0;
    }
    return firstVideo.duration;
};

const prefixWithZero = (number: number) => {
    return number < 10 ? `0${number}` : number;
};

export const getTimestampFromDuration = (duration: number) => {
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    return `${prefixWithZero(minutes)}:${prefixWithZero(seconds)}`;
};
